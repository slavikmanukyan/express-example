const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

app.set('view engine', 'pug');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json())

app.use(routes);

app.get('*', (req, res) => {
    res.status(404).end('Not found');
});

app.use((err, req, res, next) => {
    console.log(`Error: ${err}`);
    res.status(400).end('Something is wrong');
});

app.listen(8000);