const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./db/db');
const errorHandler = require('./middleware/error');

//.env setup
dotenv.config({ path: '.env' });

//db setup
connectDB();

//express setup
const app = express();
app.use(express.json());
app.use(cookieParser());

//Routes
const auth = require('./routes/auth');
const users = require('./routes/users');

//Routes setup
app.get('/', (req, res) => {
  console.log('Route connected');
  res.send('Route connected');
});

app.get('/error', (req, res) => {
  throw new Error('broken');
});

app.use('/api/auth', auth);
app.use('/api/users', users);

//custom error handling middleware
app.use(errorHandler);

//PORT
const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

//Handle unhandled Promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  //Close server & exit process
  server.close(() => process.exit(1));
});
