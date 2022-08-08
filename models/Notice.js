const { Schema, model } = require('mongoose')

const noticeSchema = new Schema({
    batch: String,
    subject: String,
    type: String,
    time: String,
    pinned: String,
    content: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 10000
    },
    timestamp: {
        type: String
    }
})

const Notice = model('Notice', noticeSchema)

module.exports = Notice