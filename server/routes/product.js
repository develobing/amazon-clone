const router = require('express').Router();
const Product = require('../model/product.js');
const upload = require('../middlewares/upload-photo');

// POST - Create a new product
router.post('/products', upload.single('photo'), async (req, res) => {
  try {
    let product = new Product();
    product.title = req.body.title;
    product.description = req.body.description;
    product.price = req.body.price;
    product.ownerId = req.body.ownerId;
    product.categoryId = req.body.categoryId;
    product.photo = req.file.location;
    product.stockQuantity = req.body.stockQuantity;

    await product.save();

    res.json({
      status: true,
      message: 'Successfully created a new product.'
    });

  } catch (err) {
    console.log('err', err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// GET - Get all ProductSchema
router.get('/products', async (req, res) => {
  try {
    let products = await Product.find();

    res.json({
      success: true,
      products
    });

  } catch (err) {
    console.log('err', err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// GET - Get a single product
router.get('/products/:id', async (req, res) => {
  try {
    let product = await Product.findOne({ _id: req.params.id });

    res.json({
      success: true,
      product
    });

  } catch (err) {
    console.log('err', err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// PUT - Update a single product
router.put('/products/:id', upload.single('photo'), async (req, res) => {
  try {
    let product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          price: req.body.price,
          category: req.body.categoryId,
          photo: req.file.location,
          description: req.body.description,
          owner: req.body.ownerId
        }
      },
      { upsert: true }
    );

    res.json({
      success: true,
      updatedProduct: product
    });

  } catch (err) {
    console.log('err', err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// DELETE - Delete a single product
router.delete('/products/:id', async (req, res) => {
  try {
    let deleteProduct = await Product.findOneAndDelete({ _id: req.params.id });

    if (deleteProduct) {
      res.json({
        success: true,
        message: 'Successfully deleted.'
      });
    }

  } catch (err) {
    console.log('err', err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;