/* eslint-disable import/first */
import express, { Request, Response, NextFunction, Application } from 'express';

const bodyParser = require('body-parser');
const app: Application = express();
const cors = require('cors');

//very important to use this in order to parse the body of the request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const middleware = require('./middleware/middlewares');
const routes = require('./routes/routes');

require('dotenv').config();

app.use(cors());

app.use(middleware.verifyAccessToken);
app.use('/api', routes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log('Server started...');
});
