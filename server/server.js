const express = require('express');
const path = require('path');
const compression = require('compression');
const bodyParser = require('body-parser');
const routes = require('../server/routes');
const mongoose = require('mongoose');
const cors = require('cors');

const app = new express();
const port = process.env.PORT || 8000;
mongoose.Promise = global.Promise;

let mongoURL = 'mongodb://estewez:obojetnie8@ds219000.mlab.com:19000/nbp';
if (process.env.NODE_ENV.trim() === "development") {
  mongoURL = 'mongodb://localhost:27017/nbp';
}

mongoose.connect(mongoURL).catch(error => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!');
    throw error;
  }
});

app.use(cors());
app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use('/', express.static(path.resolve(__dirname, '../build')));
app.use('/login', express.static(path.resolve(__dirname, '../build')));
app.use('/api', routes);


app.listen(port, () => console.log(`Listening on port: ${port}`))