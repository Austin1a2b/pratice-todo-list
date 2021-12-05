const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
  name: {
    required: true,
    type: String
  }
})

module.exports = mongoose.model('Todo', todoSchema)