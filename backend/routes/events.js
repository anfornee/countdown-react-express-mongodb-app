const router = require('express').Router();
let Event = require('../models/events.model');

router.route('/').get((req, res) => {
    Event.find()
        .then(events => res.json(events))
        .catch(err => res.status(400).json('Error: ' + err));
});

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
        .then(() => res.json('Event added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;