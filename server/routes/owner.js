const router = require('express').Router();
const Owner = require('../model/owner.js');
const upload = require('../middlewares/upload-photo');

// POST - Create a new owner
router.post('/owners', upload.single('photo'),  async (req, res) => {
  try {
    const owner = new Owner();
    owner.name = req.body.name;
    owner.about = req.body.about;
    owner.about = req.file.location;

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

// GET - Get owners
router.get('/owners', async (req, res) => {
  try {
    let owners = await Owner.find();

    res.json({
      success: true,
      owners
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