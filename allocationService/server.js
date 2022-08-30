import express from 'express';
import logger from './logger/logger.js';
import dotenv from 'dotenv';
import eventListner from './event-consumer.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const port = process.env.SERVICE_PORT;


mongoose.connect('mongodb://localhost/AllocationService')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Error connecting...', err));

eventListner().catch((e) => logger.error('error on subscribing to topic'));

app.listen(port, () => {
    logger.info(`Allocation service running on port ${port}`);
});