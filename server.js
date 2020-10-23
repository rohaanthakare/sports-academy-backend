require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const routes = require('./routes');
const ROUTES_WIHTOUT_AUTH = require('./routes').ROUTES_WIHTOUT_AUTH;
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

app.use(function (req, res, next) {
    if(ROUTES_WIHTOUT_AUTH.includes(req.originalUrl) || ROUTES_WIHTOUT_AUTH.includes(req._parsedUrl['pathname'])) {
        next();
    } else {
        let token = req.headers['authorization'];
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }

        if (token) {
            jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(403).json({
                        status: false,
                        message: 'Token is invalid'
                    });
                } else {
                    req.current_user = decoded;
                    next();
                }
            });
            // app.use('/api', routes);
        } else {
            return res.json({
                status: false,
                message: 'Auth token in not supplied'
            });
        }
    }
});

app.use('/api', routes);