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
const ownerRoutes = require('./routes/owner.js');
const authRoutes = require('./routes/auth.js');
const reviewRoutes = require('./routes/review.js');
const addressRoutes = require('./routes/address.js');
const paymentRoutes = require('./routes/payment.js');
const orderRoutes = require('./routes/order.js');

app.use('/api', productRoutes);
app.use('/api', categoryRoutes);
app.use('/api', ownerRoutes);
app.use('/api', authRoutes);
app.use('/api', reviewRoutes);
app.use('/api', addressRoutes);
app.use('/api', paymentRoutes);
app.use('/api', orderRoutes);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`${port} Connected!`);
  }
});