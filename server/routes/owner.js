const router = require('express').Router();
const Owner = require('../model/owner.js');

// POST - Create a new product
router.post('/owners',  async (req, res) => {
  try {
    const owner = new Owner();
    owner.name = req.body.name;
    owner.about = req.body.about;

    await owner.save();

    res.json({
      success: true,
      message: 'Successfully created a new owner.'
    });

  } catch (err) {
    console.log('err', err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// GET - Get categories
router.get('/owners', async (req, res) => {
  try {
    let categories = await Owner.find();

    res.json({
      success: true,
      categories
    });

  } catch (err) {
    console.log('err', err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;