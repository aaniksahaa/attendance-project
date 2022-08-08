const { Schema, model } = require('mongoose')

const classdateSchema = new Schema({
    dateHash: Number,
    attended: [{
        roll : Number,
        attend : Number
    }]
})

const Classdate = model('Date', classdateSchema)

module.exports = Classdate