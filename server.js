const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const register = require('./controller/register');
const signin = require('./controller/signin');
const profile = require('./controller/profile');
const image = require('./controller/image');

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true,
    }
  });

db.select('*').from('users').then(data => {
    console.log(data);
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.set({ 'Access-Control-Allow-Origin': 'https://face-app-kero.herokuapp.com/'});
    res.send('it is working!')
});

app.post('/signin', (req, res) => {
    res.set({ 'Access-Control-Allow-Origin': 'https://face-app-kero.herokuapp.com/'});
    signin.handleSignin(req, res, db, bcrypt)
});

app.post('/register', (req, res) => {
    res.set({ 'Access-Control-Allow-Origin': 'https://face-app-kero.herokuapp.com/'});
    register.handleRegister(req, res, db, bcrypt)
});

app.get('/profile/:id', (req, res) => {
    res.set({ 'Access-Control-Allow-Origin': 'https://face-app-kero.herokuapp.com/'});
    profile.handleProfileGet(req, res,db)
});

app.put('/image', (req, res) => {
    res.set({ 'Access-Control-Allow-Origin': 'https://face-app-kero.herokuapp.com/'});
    image.handleImage(req, res, db)
});

app.post('/imageurl', (req, res) => {
    res.set({ 'Access-Control-Allow-Origin': 'https://face-app-kero.herokuapp.com/'});
    image.handleApiCall(req, res)
});

app.listen(process.env.PORT || 3001, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});
