const { Router } = require('express');

const routes = Router();

const users = [{ name: 'Bob', password: '1111', age: 55 }, { name: 'Alice', password: '0000', age: 45 }];

routes.post('/', (req, res) => {
    users.push({ name: req.body.name });
    res.render('users', {
        users: users,
        color: req.cookies.color,
        views: req.session.views,
    });
});

routes.get('/colors/:color', (req, res) => {
    res.cookie('color', req.params.color, { expires: new Date(Date.now() + 5555555) });
    res.redirect('/users');
});

routes.get('/', (req, res) => {
    req.session.views = (req.session.views || 0) + 1;
    res.render('users', {
        users: users,
        color: req.cookies.color,
        views: req.session.views,
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

routes.get('/login', (req, res) => {
    const { error } = req.session;

    res.render('login', { error: error });
});

routes.post('/login', (req, res) => {
    const { name, password } = req.body;
    const user = users.find((user) => user.name === name && user.password === password);

    let error = null;
    if (!user) {
        req.session.error = 'Wrong name or password';

        return res.redirect('/users/login');
    }

    req.session.error = ""
    req.session.user = user;

    res.redirect('/home');
});

routes.get('/logout', (req, res) => {
    req.session.user = null;
    res.redirect('/home');
});

module.exports = routes;