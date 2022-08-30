import express, { json } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import logger from './logger/logger.js';
import Dispatch from './model/dispatch.js';
import eventListner from './event-consumer.js';
dotenv.config();

const app = express();
const port = process.env.SERVICE_PORT;

mongoose.connect('mongodb://localhost/dispatchService')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Error connecting...'));

eventListner().catch((e) => error('error on subscribing to topic'));

app.use(cors());
app.use(json());

app.get('/dispatches/:id', async (req, res) => {
    console.log(req.params.id);
    const dispatch = await Dispatch
                    .find({uniqueKey: req.params.id})
                    .select('-_id -__v');
                    
    if(!dispatch) return res.status(404).send(`can't find data with key: ${req.params.id}`);

    res.send(dispatch);
    logger.debug(dispatch);
    logger.debug("Get a dispatch api called...");
});

app.get('/dispatches', async (req, res) => {
    const dispatches = await Dispatch
                        .find()
                        .select('-_id -__v');

    if(!dispatches) return res.status(404).send(`can't find dispatches`);
    res.send(dispatches);
    logger.debug("List dispatches api called...");
})

app.listen(port, () => {
    logger.info(`Order service running on port ${port}`);
});

