import { Kafka } from "kafkajs";
import eventProducer from "./event-producer.js";
import logger from "./logger/logger.js";
import { Stock } from "./model/stock.js"; 

const kafka = new Kafka({
    clientId: process.env.CLIENT_ID,
    brokers: [process.env.BROKER_URL || 'localhost:9092']
});

const eventListner = async () => {
    const consumer = kafka.consumer({
        groupId: process.env.CONSUMER_GROUP || 'default',
        retry: { retries: 0 },
    });
    logger.info(`subscribing to ${process.env.LISTEN_TOPIC || 'error'}`);
    await consumer
        .subscribe({
            topic: process.env.LISTEN_TOPIC || 'error',
            fromBeginning: false,
        })
        .catch((e) => logger.error(e));

    await consumer.run({
        autoCommit: false,
        eachMessage: async ({ topic, partition, message }) => {
            logger.debug(`new message : ${message.value?.toString()}`);

            const newMessage = JSON.parse(message.value?.toString() || '{}');

            if(!(newMessage?.type === 'NEW_ORDER')) {
                logger.info(
                    `incoming message is not New Order type. (${newMessage?.type}) skipped the process`
                );
                return;
            }

            //business logic
            const stock = await Stock.findOne({ fuelType: 'octane92'});
            console.log(stock.availableAmount);
            if(newMessage.amount > stock.availableAmount) {
                await eventProducer(process.env.RESPOND_TOPIC || 'error', {
                    from: process.env.SERVICE_NAME,
                    type: 'NEW_ORDER_RESPONSE',
                    //key: newMessage.NIC,
                    uniqueKey: newMessage.uniqueKey,
                    //amount: newMessage.amount,
                    result: 'Insufficient Stock'
                })
                .catch((e) => {
                    throw new Error('error on publishing message', e);
                });
                logger.debug('responded to message, out of stock');
                return;
            }

            stock.availableAmount = stock.availableAmount - newMessage.amount;
            await stock.save();

            await eventProducer(process.env.RESPOND_TOPIC || 'error', {
                from: process.env.SERVICE_NAME,
                type: 'NEW_ORDER_RESPONSE',
                key: newMessage.key,
                uniqueKey: newMessage.uniqueKey,
                amount: newMessage.amount,
                result: 'allocation success'
            })
            .catch((e) => {
                throw new Error('error on publishing message', e);
            });
            logger.debug('responded to message');

            await consumer.commitOffsets([
                {
                  topic,
                  partition,
                  offset: (Number(message.offset) + 1).toString(),
                },
              ]);
        },
    });
}

export default eventListner;