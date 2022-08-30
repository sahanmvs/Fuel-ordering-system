import { Kafka } from "kafkajs";
import logger from "./logger/logger.js";

const kafka = new Kafka({
    clientId: process.env.CLIENT_ID,
    brokers: [process.env.BROKER_URL || 'localhost:9092'],
});

const producer = kafka.producer();

const eventProducer = async (topic, payload, key) => {
    await producer
        .connect()
        .catch((e) => logger.error('error on connecting to Kafka', e));

    if(key) {
        await producer.send({
            topic: topic,
            messages: [{
                key: key,
                value: JSON.stringify(payload)
            }],
        });
    } else {
        await producer.send({
            topic: topic,
            messages: [{ value: JSON.stringify(payload) }],
        });
    }
}

export default eventProducer;