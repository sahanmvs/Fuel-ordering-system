import mongoose from "mongoose";

const Stock = mongoose.model('Stock', new mongoose.Schema({
    availableAmount: {
        type: Number,
        min: 0,
        max: 100000
    },
    fuelType: {
        type: String,
        minlength: 4,
        maxlength: 50
    },
    date: {
        type: Date,
        default: Date.now()
    }
}));

export { Stock };