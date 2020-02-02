const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 3001

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize())
app.use(passport.session())

app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
const connection = mongoose.connection
connection.once('open', () => {
  console.log('Synchronization complete. Disc activated')
})

const eventsRouter = require('./routes/events')
const usersRouter = require('./routes/users')

app.use('/events', eventsRouter)
app.use('/users', usersRouter)

app.listen(port, () => {
  console.log('Activated')
})
