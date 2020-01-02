const mongoose = require('mongoose')

const Schema = mongoose.Schema

const eventSchema = new Schema({
  userId: {
    type: String,
    require: true
  },
  userName: {
    type: String,
    require: true
  },
  title: {
    type: String,
    require: true
  },
  day: {
    type: Number,
    require: true
  },
  month: {
    type: Number,
    require: true
  },
  year: {
    type: Number,
    require: true
  },
  background: {
    type: String,
    require: true
  }
}, {
  timestamps: true
})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event

