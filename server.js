const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
let swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('./swagger.json');
const errorHandler = require('./middleware/error');

const morgan = require('morgan');
const connectDB = require('./config/db');

//load env vars

dotenv.config();

//Connect to database

connectDB();

//mount routes
const auth = require('./routes/auth');
const article = require('./routes/article');

const app = express();

app.use(express.json());

//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/demo', (req, res) => {
  res.send('this is demo API for testing for serverless deployment...')
})

//mount routes
app.use('/auth', auth);
app.use('/article', article);

const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});


process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //close server
  server.close(() => process.exit(1));
});
module.exports = server;