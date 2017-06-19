require('dotenv').config({ path: `.env/${process.env.NODE_ENV}.env` });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const router = require('./lib/router');

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URL);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
if (process.env.NODE_ENV === 'production') {
  app.use('/api', router);
} else {
  app.use(router);
  app.use(cors());
}

app.listen(process.env.PORT, () => {
  console.info(`SlapSnack listening on port ${process.env.PORT}!`);
});
