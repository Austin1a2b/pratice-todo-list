const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/pratice-todo-list')
const db = mongoose.connection

const Todo = require('../todo')

let array = []
for (let i = 1; i < 6; i++) {
  array.push({ name: `todo-${i}` })
}

db.once('open', () => {
  Todo.insertMany(array)
    .then(() => {
      console.log('Seeders is  done')
      db.close()
    })
    .catch(err => console.log(err))
    .finally(() => process.exit())
})