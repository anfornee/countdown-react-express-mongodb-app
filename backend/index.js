const express =require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { usedNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Synchronization complete. Disc activated');
});

const eventsRouter = require('./routes/events');

app.use('/events', eventsRouter);

app.listen(port, () => {
    console.log('Activated');
});