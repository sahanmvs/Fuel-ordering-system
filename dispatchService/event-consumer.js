import {Kafka} from 'kafkajs';
import logger from './logger/logger.js';
import Dispatch from './model/dispatch.js';

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
        eachMessage: async({ topic, partition, message}) => {
            
            try {
                logger.debug(`new message : ${message.value.toString()}`);

                const newMessage = JSON.parse(message.value.toString() || '{}');

                if(!(newMessage?.type === 'SCHEDULE_COMPLETE')) {
                    logger.info(
                        `incoming message is not SCHEDULE_COMPLETE type. (${newMessage?.type}) skipped the process`
                    );
                    return;
                }

                let dispatch = new Dispatch({
                    NIC: newMessage.key,
                    uniqueKey: newMessage.uniqueKey,
                    amount: newMessage.amount,
                    status: newMessage.result,
                    scheduledDate: newMessage.date
                })

                dispatch = await dispatch.save();
                logger.debug(`dispatch saved successfully: ${dispatch}`);
                
                await consumer.commitOffsets([
                    {
                        topic,
                        partition,
                        offset: (Number(message.offset) + 1).toString(),
                    },
                    ]);
                } catch (error) {
                    console.log(error);
                }
            
        }
    });

}

export default eventListner;