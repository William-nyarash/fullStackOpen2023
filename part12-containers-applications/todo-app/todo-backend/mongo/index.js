const mongoose = require('mongoose')
const Todo = require('./models/Todo')
const { MONGO_URL } = require('../util/config')

console.log("the connection string is ", process.env.MONGO_URL);
if (MONGO_URL && !mongoose.connection.readyState) mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=> console.log("connection succesful"))
  console.log('Mongo URI:', process.env.MONGO_URL);



module.exports = {
  Todo
}
