const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const levelSchema = new Schema({
    value: {
        type: Number,
        required: true
    },
    created_at: {
        type: String,
        default: Date.now
    }
})
module.exports = mongoose.model("Level", levelSchema, "levels")