const express = require('express');
const Review = require('../model/review.js');
const Product = require('../model/product.js');
const verifyToken = require('../middlewares/verify-token.js');
const upload = require('../middlewares/upload-photo.js');
const router = express.Router();

// Get reviews
router.get('/reviews/:productId', async (req, res) => {
  try {
    const productReviews = await Review.find({
      productId: req.params.productId
    })
      .populate('user')
      .exec();

    res.json({ success: true, reviews: productReviews });

  } catch (err) {
    console.log('err', err);
    res.status(500)
      .json({
        success: false,
        message: err.message
      });
  }
});

// Add a review
router.post('/reviews/:productId', [ verifyToken, upload.single('photo') ], async (req, res) => {
  try {
    const review = new Review();
    review.headline = req.body.headline;
    review.body = req.body.body;
    review.rating = req.body.rating;
    review.photo = req.file.location;
    review.user = req.decoded._id;
    review.productId = req.params.productId;

    await Product.update({ $push: { reviews: review._id } });
    const savedReview = await review.save();

    if (savedReview) {
      res.json({ success: true, message: 'Successfully review added.' });
    }

  } catch (err) {
    console.log('err', err);
    res.status(500)
      .json({
        success: false,
        message: err.message
      });
  }
});

module.exports = router;