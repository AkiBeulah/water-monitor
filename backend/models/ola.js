const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const olaSchema = new Schema({
    air_q: {
        type: Number,
        index: true,
        required: true
    },
    temp: {
        type: Number,
        index: true,
        required: true
    },
    hum: {
        type: Number,
        index: true,
        required: true
    },
    created_at: {
        type: String,
        default: Date.now
    }
})
module.exports = mongoose.model("Ola", olaSchema, "ola")