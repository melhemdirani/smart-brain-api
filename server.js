const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs')
const knex= require('knex')
const cors =require('cors')
const register = require('./controllers/register'); 
const signin = require('./controllers/signin');
const profile = require('./profile');
const image = require('./controllers/image');

const db= knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'melhemdirani',
      password : '',
      database : 'smart-brain'
    }
});

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.get('/',(req, res) =>  {res.send("it is working")})
app.post('/register',(req, res) =>  {register.handleRegister(req, res, db, bcrypt)})
app.post('/signin',(req, res) => {signin.handleSignin(req, res,  db, bcrypt)})
app.get('/profile/:id', (req,res)=>{profile.handleProfile(req, res, db)})
app.put('/image', (req,res)=>{image.handleImage(req,res,db)})
app.post('/imageurl', (req,res)=>{image.handleApiCall(req,res)})

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`app is running on port ${process.env.PORT}`);
})