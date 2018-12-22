const { Router } = require('express');


const routes = Router();

routes.get('/', (req, res) => {
    res.render('index', { 
        title: 'Hello world',
        message: 'Hello message',
        user: req.session.user,
    });
});

module.exports = routes;