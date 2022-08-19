import { Kafka } from "kafkajs";
import eventProducer from "./event-producer.js";
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
            fromBeginning: false,
        })
        .catch((e) => logger.error(e));

    await consumer.run({
        autoCommit: true,
        eachMessage: async ({ topic, partition, message }) => {
            try {
                logger.debug(`new message : ${message.value.toString()}`);

                const newMessage = JSON.parse(message.value.toString() || '{}');
    
                switch(newMessage.type) {
                    case 'NEW_ORDER_RESPONSE':
                    let order = await Order.findOne({ uniqueKey: newMessage.uniqueKey });
                    if(!order) {
                        return logger.info(`can't find a order with incoming ${newMessage?.uniqueKey}`);
                    }
        
                    order.status = newMessage.result;
                    await order.save();

                    if(newMessage.result == 'allocation success') {
                        await eventProducer(process.env.PRODUCE_TOPIC || 'error', {
                            from: process.env.SERVICE_NAME,
                            type: 'ALLOCATION_COMPLETE',
                            key: newMessage.key,
                            uniqueKey: newMessage.uniqueKey,
                            amount: newMessage.amount,
                            result: 'allocation success'
                        })
                        .catch((e) => {
                            throw new Error('error on publishing message', e);
                        });
                        logger.debug('sent ALLOCATION_COMPLETE message');
                    }
                    break;

                    //case 'SCHEDULE_COMPLETE':
                }
    
                
                
                await consumer.commitOffsets([
                    {
                      topic,
                      partition,
                      offset: (Number(message.offset) + 1).toString(),
                    },
                  ]);
            } catch (error) {
                console.log('error===>',error);
            }
        },
    });
}

export default eventListner;