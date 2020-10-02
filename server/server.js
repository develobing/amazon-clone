require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Model
const User = require('./model/user.js');

mongoose.connect(process.env.DATABASE,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Connected to the database');
    }
  });

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const productRoutes = require('./routes/product.js');
const categoryRoutes = require('./routes/category.js');
const OwnerRoutes = require('./routes/owner.js');

app.use('/api', productRoutes);
app.use('/api', categoryRoutes);
app.use('/api', OwnerRoutes);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`${port} Connected!`);
  }
});