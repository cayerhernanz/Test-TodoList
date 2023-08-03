const express = require('express');
const app = express();

require('dotenv').config();

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_DB)
    .then(() => console.log('Connexion à MongoDb réussie!'))
    .catch(() => console.log('Connexion à MongoDB échouée!'));

const userRoutes = require('./routes/user');
app.use('/api/auth', userRoutes);

const taskRoutes = require('./routes/task');
app.use('api/tasks', taskRoutes);

module.exports = app;