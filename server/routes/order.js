const express = require('express');
const verifyToken = require('../middlewares/verify-token.js');
const Order = require('../model/order.js');
const router = express.Router();

router.get('/orders', verifyToken, async (req, res) => {
  try {
    let products = await Order.find({ owner: req.decoded._id })
      .deepPopulate('owner products.productId.owner')
      .exec();

    res.json({
      success: true,
      products
    });

  } catch (err) {
    console.log('err', err);
    res.status(500)
      .json({ success: false, message: err.message });
  }
});

module.exports = router;
