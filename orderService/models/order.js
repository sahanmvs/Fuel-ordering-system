import { v4 as uuidv4 } from 'uuid';
import eventProducer from '../event-producer.js';
import logger from '../logger/logger.js'; 
import mongoose from 'mongoose';
import Joi from 'joi';

const Order = mongoose.model('Order', new mongoose.Schema({
    NIC: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 255,
    },
    amount: {
        type: Number,
        required: true,
    },
    uniqueKey: {
        type: String,
    },
    status: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
    },
    time: {
        type: Date,
        default: Date.now()
    }
}));

function validateOrder(order) {
    const schema = Joi.object({
        NIC: Joi.string().min(10).max(50).required(),
        amount: Joi.number().min(1000).required(),
    });

    return schema.validate(order);
}

async function createNewOrder(NIC, amount) {
    const uniqueKey = uuidv4();
    const event = {
        from: process.env.SERVICE_NAME,
        type: 'NEW_ORDER',
        key: NIC,
        uniqueKey: uniqueKey,
        amount: amount,
        result: 'pending'
    };

    await eventProducer(process.env.PRODUCE_TOPIC || 'error', event).catch((e) => logger.error(e));

    return uniqueKey;
}

export { Order, createNewOrder as createOrder, validateOrder as validate };