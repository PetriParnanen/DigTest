const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const auth = require('./src/routes/auth');
const users = require('./src/routes/users');
const contacts = require('./src/routes/contacts');

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());

const mongoOptions = {
  "useNewUrlParser": true
}

mongoose.connect(process.env.MONGODB_URL, mongoOptions);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/contacts', contacts);

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,  '/client/build/index.html'))
});

app.listen(port, () => console.log(`Running on port ${port}`));
