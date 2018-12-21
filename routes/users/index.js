const { Router } = require('express');

const routes = Router();

const users = [{ name: 'Bob' }];

routes.post('/', (req, res) => {
    users.push({ name: req.body.name });
    res.render('users', {
        users: users
    });
});

routes.get('/', (req, res) => {
    res.render('users', {
        users: users
    });
});

routes.get('/new', (req, res) => {
    res.render('newUser');
});

routes.get('/delete/:name', (req, res) => {
    const { name } = req.params;

    let index = -1;
    for (let i = 0; i < users.length; i++) {
        if (users[i].name === name) {
            index = i;
            break;
        }
    }

    if (index >= 0) {
        users.splice(index, 1);
    }
    res.render('users', {
        users: users
    });
});

module.exports = routes;