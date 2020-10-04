const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Model
const User = require('./model/user.js');

mongoose.set('useCreateIndex', true);
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
const AuthRoutes = require('./routes/auth.js');
const ReviewRoutes = require('./routes/review.js');
const AddressRoutes = require('./routes/address.js');

app.use('/api', productRoutes);
app.use('/api', categoryRoutes);
app.use('/api', OwnerRoutes);
app.use('/api', AuthRoutes);
app.use('/api', ReviewRoutes);
app.use('/api', AddressRoutes);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`${port} Connected!`);
  }
});