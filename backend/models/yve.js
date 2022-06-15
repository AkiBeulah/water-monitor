const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const yveSchema = new Schema({
    temp: {
        type: Number,
        index: true,
        required: true
    },
    pulse_rate: {
        type: Number,
        index: true,
        required: true
    },
    blood_oxygen: {
        type: Number,
        index: true,
        required: true
    },
    created_at: {
        type: String,
        default: Date.now
    }
})
module.exports = mongoose.model("Yve", yveSchema, "yve")