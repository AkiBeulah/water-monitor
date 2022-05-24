const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const channelSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        default: "Channel"
    },
    value: {
        type: Number,
        unique: true,
        index: true,
        required: true
    },
    state: {
        type: Boolean,
        required: true,
        default: false
    },
    modified: {
        type: String,
        default: Date.now
    }
})
module.exports = mongoose.model("Channel", channelSchema, "channels")