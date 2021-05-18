require('./models/UserModel')
const express = require('express')
const mongoose = require('mongoose')
const app = express()
//const authRoutes = require('authRoutes')
const bodyParser = require('body-parser')
const User = mongoose.model('User')
app.use(bodyParser.json())
//app.use(authRoutes)
const mongoUri =
  'mongodb+srv://admin:passwordpassword@cluster0.hwo1l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
mongoose.connection.on('connected', () => {
  console.log('Connected to Mongo')
})
mongoose.connection.on('error', (err) => {
  console.log('Error connecting to Mongo')
})

app.listen('5000', () => {
  console.log('App is listening on port 5000')
})

app.get('/', (req, res) => {
  res.send("Welcome to Vit's Garden")
})
app.post('/signup', (req, res) => {
  const { email, password } = req.body
  const user = new User({ email, password })
  user
    .save()
    .then(() => {
      console.log('user was saved')
    })
    .catch((err) => console.log(err))
})
