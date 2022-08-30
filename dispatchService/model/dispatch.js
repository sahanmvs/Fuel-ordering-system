import mongoose from "mongoose";
import logger from "../logger/logger.js";

const Dispatch = mongoose.model('Dispatch', new mongoose.Schema({
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
    scheduledDate: {
        type: Date,
        required: true
    },
    time: {
        type: Date,
    }
}));

export default Dispatch;