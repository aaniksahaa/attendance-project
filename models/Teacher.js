const { Schema, model } = require('mongoose')

const teacherSchema = new Schema({
    name: String,
    imageurl: String,
    secretkey: String,
    password: String
}) 

const Teacher = model('Teacher', teacherSchema)

module.exports = Teacher