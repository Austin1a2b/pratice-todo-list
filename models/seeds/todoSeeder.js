const mongoose = require('mongoose')
const Todo = require('../Todo')

mongoose.connect('mongodb://localhost/pratice-todo-list')
const db = mongoose.connection

db.on('error', () => { console.log('something error') })

db.once('open', () => {
  console.log('connected')
  for (let i = 0; i < 10; i++) {
    Todo.create({
      name: `name-${i}`
    })
  }
  console.log('done')
})