const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  text:{type: String, required: true},
  done: Boolean
})

module.exports = mongoose.model('Todo', todoSchema)