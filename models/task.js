const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 64,
        minlength: 1,
        trim: true,
        index: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 1000,
        minlength: 1,
        trim: true
    },
    status: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Number,
        default: Date.now
    },
    updatedAt: {
        type: Number,
        default: Date.now
    }
})

module.exports = mongoose.model('Task', taskSchema)