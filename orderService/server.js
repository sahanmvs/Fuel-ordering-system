import express, { json } from 'express';
import dotenv from 'dotenv';
import logger from './logger/logger.js';
import { Order, validate, createOrder } from './models/order.js';
import mongoose from 'mongoose';
import eventListner from './event-consumer.js';
import cors from 'cors'
dotenv.config();

const app = express();
const port = process.env.SERVICE_PORT;

mongoose.connect('mongodb://localhost/OrderService')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Error connecting...', err));

eventListner().catch((e) => error('error on subscribing to topic'));

app.use(cors());    // forgot (), wasted a day :)
app.use(json());

app.post('/orders', async (req, res) => {
    const { error } = validate(req.body);
    if(error) {
        logger.error(`invalid request. NIC: ${req.body.NIC} type: ${req.body.type}`);
        return res.status(400).send(error.details[0].message);
    }

    logger.debug( `new order request initiated for ${req.body.NIC}`);
    const uniqueKey = await createOrder(req.body.NIC, req.body.amount);
    if(!uniqueKey) return res.status(404).send('no unique key');

    let order = new Order({
        NIC: req.body.NIC,
        amount: req.body.amount,
        uniqueKey: uniqueKey,
        status: 'pending'
    });

    order = await order.save();

    res.status(200).send({id: uniqueKey});
});

app.get('/orders', async (req, res) => {
    const orders = await Order
                    .find()
                    .select('-_id -__v');
    res.send(orders);
    logger.debug("Get all orders api called...");
});

app.listen(port, () => {
    logger.info(`Order service running on port ${port}`);
});


