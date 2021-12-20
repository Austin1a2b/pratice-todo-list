const express = require('express')
const exphds = require('express-handlebars')
const { render } = require('express/lib/response')
const mongoose = require('mongoose')

const app = express()
app.engine('handlebars', exphds({ defaultlayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }))

const port = 3000

mongoose.connect('mongodb://localhost:27017/pratice-todo-list')
const db = mongoose.connection
const Todo = require('./models/todo')

db.on('error', (error) => console.log(error))

db.once('open', () => {
  console.log('mongoose connection success')
})

app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .then((todos) => {
      res.render('index', { todos: todos })
    })
})

app.get('/todos/new', (req, res) => {
  res.render('new')
})

app.post('/todos', (req, res) => {
  const todo = req.body.todo
  Todo.create({ name: todo })
    .then(() => res.redirect('/'))
})


app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  Todo.findById(id)
    .lean()
    .then(todo => {
      res.render('detail', { todo: todo })
      console.log(todo)
    })
})

app.post('/todos/:id', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  Todo.findById(id)
    .then(todo => {
      todo.name = name
      return todo.save()
    })
    .then(res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  Todo.findById(id)
    .lean()
    .then(todo => res.render('edit', { todo: todo }))
})

app.post('/todos/:id/delete', (req, res) => {
  const id = req.params.id
  Todo.findById(id)
    .then((todo) => todo.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

app.listen(port, () => { console.log(`http://localhost:${port}`) })