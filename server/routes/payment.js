const express = require('express');
const moment = require('moment');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const verifyToken = require('../middlewares/verify-token.js');
const Order = require('../model/order.js');
const router = express.Router();

const SHIPMENT = {
  normal: {
    price: 13.98,
    days: 7
  },
  fast: {
    price: 49.98,
    days: 3
  }
};

// POST - Get shipment information
router.post('/shipment', async (req, res) => {
  try {
    let shipment;

    if (req.body.shipment === 'normal') {
      shipment = shipmentPrice(SHIPMENT.normal);
    } else {
      shipment = shipmentPrice(SHIPMENT.fast);
    }

    res.json({
      success: true,
      shipment
    });

  } catch (err) {
    console.log('err', err);
    res.status(500)
      .json({ success: false, message: err.message });
  }
});

// POST - Pay for user's order
router.post('/payment', verifyToken, (req, res) => {
  let totalPrice = Math.round(req.body.totalPrice * 100);

  stripe.customers.create({ email: req.decoded.email })
    .then((customer) => {
      return stripe.customers.createSource(customer.id, {
        source: 'tok_visa'
      });
    })
    .then((source) => {
      return stripe.charges.create({
        amount: totalPrice,
        currency: 'usd',
        customer: source.customer
      });
    })
    .then(async (charge) => {
      let order = new Order();
      let cart = req.body.cart;

      cart.map((product) => {
        order.products.push({
          productId: product._id,
          quantity: parseInt(product.quantity),
          price: product.price
        });
      });

      order.owner = req.decoded._id;
      order.estimatedDelivery = req.body.estimatedDelivery;
      await order.save();

      res.json({
        success: true,
        message: 'Successfully made a payment.'
      });
    })
    .catch((err) => {
      console.log('err', err);
      res.status(500)
        .json({ success: false, message: err.message });
    });
});

function shipmentPrice(shipmentOption) {
  let estimated = moment()
    .add(shipmentOption.days, 'd')
    .format('dddd MMMM Do');

  return { estimated, price: shipmentOption.price };
}

module.exports = router;