const express = require('express')
const router = express.Router()
const Event = require('../models/events.model')

// Gets Event

router.route('/:userId').get((req, res) => {
  Event.find({ userId: req.params.userId })
    .then(events => res.json(events))
    .catch(err => res.status(400).json('Error: ' + err))
})

// Add Event

router.route('/add-an-event').post((req, res) => {
  const newEvent = new Event({
    userId: req.body.userId,
    userName: req.body.userName,
    title: req.body.title,
    day: Number(req.body.day),
    month: Number(req.body.month),
    year: Number(req.body.year),
    background: req.body.background
  })

  newEvent.save()
    .then(() => res.json(newEvent))
    .catch(err => res.status(400).json('Error: ' + err))
})

// Delete Event

router.delete('/delete', async (req, res) => {
  await Event.findByIdAndDelete(req.query.eventId, err => {
    res.send(err)
  })
})

module.exports = router
