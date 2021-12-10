const express = require('express')
const exphbs = require('express-handlebars')
const Todo = require('./models/todo')


const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/pratice-todo-list')

const app = express()
const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))

const db = mongoose.connection
db.on('error', () => {
  console.log('error')
})

db.once('open', () => {
  console.log('mongodb connected')
})

app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .then(todos => res.render('index', { todos: todos }))
    .catch(error => console.error(error))
})

//以下為 新增todo 功能 
app.get('/todos/new', (req, res) => {
  res.render('new')
})

app.post("/todos", (req, res) => {
  const name = req.body.name
  return Todo.create({ name: name })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})
//#新增todo 功能

//新增瀏覽某一 詳細 todo 
app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('detail', { todo: todo }))
    .catch(error => console.error(error))
})
//#新增瀏覽某一 詳細 todo 

//新增- 編輯todo 
app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('edit', { todo: todo }))
    .catch(error => console.log(error))
})

app.post('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})
//#新增- 編輯todo 
app.listen(port, () => {
  console.log('localhost:3000')
})