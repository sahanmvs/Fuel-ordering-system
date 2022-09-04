import express, { json } from 'express';
import logger from './logger/logger.js';
import dotenv from 'dotenv';
import eventListner from './event-consumer.js';
import mongoose from 'mongoose';
import cors from 'cors';
import {Stock} from './model/stock.js';

dotenv.config();

const app = express();
const port = process.env.SERVICE_PORT;

app.use(json());
app.use(cors());

mongoose.connect('mongodb://localhost/AllocationService')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Error connecting...', err));

eventListner().catch((e) => logger.error('error on subscribing to topic'));

app.post('/allocation/stock', async (req, res) => {
    let stock = await Stock.findOne({fuelType: 'octane92'});
    if(!stock) {
        logger.debug('octane92 not available');
        return res.status(404).send('octane92 not available');
    }
    if(req.body.amount > stock.availableAmount) {
        logger.debug('Insuffiecient stocks');
        return res.status(400).send(`current stock is less than ${req.body.amount} L`);
    }

    res.status(200).send(stock);
});

app.listen(port, () => {
    logger.info(`Allocation service running on port ${port}`);
});