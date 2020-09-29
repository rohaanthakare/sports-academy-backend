require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const port = process.env.PORT || 1912;
const server = app.listen(port, () => {
    console.log('Connected to Port - ' + port);
});

mongoose.set('debug', true);
mongoose.connect(process.env.DB_URL);
mongoose.connection.on('connected', () => {
    console.log('Connected to DB - ' + process.env.DB_URL);
});

app.use('/api', routes);