const router = require('express').Router();
const Event = require('../models/events.model');
const mongo = require('mongodb')


/////////// Gets Event ////////////

router.route('/').get((req, res) => {
    Event.find()
        .then(events => res.json(events))
        .catch(err => res.status(400).json('Error: ' + err));
});

/////////// Add Event ////////////

router.route('/add-an-event').post((req, res) => {
    const title = req.body.title;
    const day = Number(req.body.day);
    const month = Number(req.body.month);
    const year = Number(req.body.year);
    const background = req.body.background;

    const newEvent = new Event({
        title,
        day,
        month,
        year,
        background,
    });

    newEvent.save()
        .then(() => res.json(newEvent))
        .catch(err => res.status(400).json('Error: ' + err));
});

/////////// Delete Event ////////////

router.delete('/delete', async (req, res) => {
    await Event.findByIdAndDelete(req.query.eventId, err => {
        res.send(err)
    });
});

module.exports = router;