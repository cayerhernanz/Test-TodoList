const express = require('express');
const app = express();
const path = require('path');

require('dotenv').config();
const mongoCred = process.env.MONGO_DB;

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect(mongoCred,
    {userNewUrlParser: true,
    userUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDb réussie!'))
    .catch(() => console.log('Connexion à MongoDB échouée!'));

const userRoutes = require ('./routes/user');
app.use('/api/auth', userRoutes);

module.exports = app;