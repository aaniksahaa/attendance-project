const { Schema, model } = require('mongoose')

const variableSchema = new Schema({
    name: String,
    value: Number
})

const Variable = model('Variable', variableSchema)

module.exports = Variable