const express = require('express')
const exphbs = require('express-handlebars')
/////////
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/pratice-todo-list')
//////////
const app = express()
const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

/////////////
const db = mongoose.connection
db.on('error', () => {
  console.log('error')
})

db.once('open', () => {
  console.log('mongodb connected')
})
/////////////

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log('localhost:3000')
})


