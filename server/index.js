const express = require('express');
const bodyParser = require('body-parser');;
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const userRoutes = require('./routes/user');
const omdbRoutes = require('./routes/omdb');

const cors = require('cors');

// Setting up express
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(cors());
dotenv.config();

// Connecting mongoDB
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  })
  .then(
    () => {
      console.log('Database connected');
    },
    (error) => {
      console.log('Database could not be connected : ' + error);
    }
  );
global.db = process.env.MONGODB_URI;

// Conectting port
app.listen(process.env.PORT || 8080, () =>
  console.log(`server runing on port ${process.env.PORT}`)
);

app.use('/user', userRoutes);
app.use('/omdb', omdbRoutes);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// error handler
app.use( (err, req, res, next) => {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
