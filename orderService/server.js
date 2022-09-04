import express, { json } from 'express';
import dotenv from 'dotenv';
import logger from './logger/logger.js';
import { Order, validate, validateOrderRequest, createOrder } from './models/order.js';
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

app.post('/orders/status', async (req, res) => {
    const { error } = validateOrderRequest(req.body);
    if(error) {
        logger.error(`invalid request. uniqueKey: ${req.body.uniqueKey} NIC: ${req.body.NIC}`);
        return res.status(400).send(error.details[0].message);
    }

    const order = await Order.findOne({uniqueKey: req.body.uniqueKey})
    if(!order) return res.status(404).send("Enter a valid key");

    if(req.body.NIC != order.NIC) return res.status(404).send("Key and NIC mismatch");

    res.status(200).send(order);
});

app.put('/orders/confirm', async (req, res) => {
    console.log(req.body);
    let order = await Order.findOne({uniqueKey: req.body.uniqueKey});
    if(!order) return res.status(404).send("Can't find the order");

    order.set({
        status: "Order receive success",
    });

    order = await order.save();
    res.send(order);
});

app.post('/orders', async (req, res) => {
    const { error } = validate(req.body);
    if(error) {
        logger.error(`invalid request. NIC: ${req.body.NIC} type: ${req.body.type}`);
        return res.status(400).send(error.details[0].message);
    }

    logger.debug( `new order request initiated for ${req.body.NIC}`);
    const uniqueKey = await createOrder(req.body.NIC, req.body.amount);
    if(!uniqueKey) {
        logger.debug(`no unique key`);
        return res.status(404).send('Server error');
    } 

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
    //logger.debug(orders);
    logger.debug("Get all orders api called...");
});

app.listen(port, () => {
    logger.info(`Order service running on port ${port}`);
});


