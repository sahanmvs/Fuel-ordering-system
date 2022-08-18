import { Kafka } from "kafkajs";
import logger from "./logger/logger.js";
import { Order } from "./models/order.js";

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
            fromBeginning: true,
        })
        .catch((e) => logger.error(e));

    await consumer.run({
        autoCommit: false,
        eachMessage: async ({ topic, partition, message }) => {
            logger.debug(`new message : ${message.value?.toString()}`);

            const newMessage = JSON.parse(message.value?.toString() || '{}');

            if(!(newMessage?.type === 'NEW_ORDER_RESPONSE')) {
                logger.info(
                    `incoming message is not NEW_ORDER_RESPONSE type. (${newMessage?.type}) skipped the process`
                );
                return;
            }

            //business logic
            let order = await Order.findOne({ uniqueKey: newMessage.uniqueKey });
            if(!order) {
                return logger.info(`can't find a order with incoming ${newMessage?.uniqueKey}`);
            }

            //console.log(order);
            order.status = newMessage.result;
            await order.save();
            
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