const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session')
const routes = require('./routes');

const app = express();

app.set('view engine', 'pug');

app.use(express.static('public'));

app.use(cookieParser());
app.use(cookieSession({
    name: 'session',
    keys: ['secretKey'],
    maxAge: 24 * 60 * 60 * 1000,
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

app.use(routes);

app.get('*', (req, res) => {
    res.status(404).end('Not found');
});

app.use((err, req, res, next) => {
    console.log(`Error: ${err}`);
    res.status(400).end('Something is wrong');
});

app.listen(8000);