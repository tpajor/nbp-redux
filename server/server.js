const express = require('express');
const path = require('path');
const compression = require('compression');
const bodyParser = require('body-parser');
const routes = require('../server/routes');
const mongoose = require('mongoose');

const app = new express();
const port = process.env.PORT || 8000;
console.log('in');
mongoose.Promise = global.Promise;

const mongoConfig = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/nbp',
  port: process.env.PORT || 8000,
};

mongoose.connect(mongoConfig.mongoURL, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!');
    throw error;
  }
});

app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use('/', express.static(path.resolve(__dirname, '../build')));
app.use('/login', express.static(path.resolve(__dirname, '../build')));
app.use('/api', routes);


app.listen(port, () => console.log(`Listening on port: ${port}`))