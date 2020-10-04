const express = require('express');
const Category = require('../model/category.js');
const router = express.Router();

// POST - Create a new product
router.post('/categories',  async (req, res) => {
  try {
    const category = new Category();
    category.type = req.body.type;

    await category.save();

    res.json({
      success: true,
      message: 'Successfully created a new category.'
    });

  } catch (err) {
    console.log('err', err);
    res.status(500)
      .json({ success: false, message: err.message });
  }
});

// GET - Get categories
router.get('/categories', async (req, res) => {
  try {
    let categories = await Category.find();

    res.json({
      success: true,
      categories
    });

  } catch (err) {
    console.log('err', err);
    res.status(500)
      .json({ success: false, message: err.message });
  }
});

module.exports = router;