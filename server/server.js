const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json('Hello Amazon Clone');
});

app.post('/', (req, res) => {
  res.json('Hello');
});


app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`${port} Connected!`);
  }
});