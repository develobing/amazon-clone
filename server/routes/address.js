const express = require('express');
const axios = require('axios');
const Address = require('../model/address.js');
const User = require('../model/user.js');
const verifyToken = require('../middlewares/verify-token.js');
const router = express.Router();

// Get all the addresses
router.get('/addresses', verifyToken, async (req, res) => {
  try {
    let addresses = await Address.find({ user: req.decoded._id });

    res.json({ success: true, addresses });

  } catch (err) {
    console.log('err', err);
    res.status(500)
      .json({ success: false, message: err.message });
  }
});

// Get one address
router.get('/addresses/:id', verifyToken, async (req, res) => {
  try {
    let address = await Address.findOne({ _id: req.params.id });

    res.json({ success: true, address });

  } catch (err) {
    console.log('err', err);
    res.status(500)
      .json({ success: false, message: err.message });
  }
});

// Add an address
router.post('/addresses', verifyToken, async (req, res) => {
  try {
    let address = new Address();
    address.user = req.decoded._id;
    address.country = req.body.country;
    address.fullName = req.body.fullName;
    address.streetAddress = req.body.streetAddress;
    address.city = req.body.city;
    address.state = req.body.state;
    address.zipCode = req.body.zipCode;
    address.phoneNumber = req.body.phoneNumber;
    address.deliveryInstructions = req.body.deliveryInstructions;
    address.securityCode = req.body.securityCode;

    await address.save();
    res.json({ success: true, message: 'Successfully added an address.' });

  } catch (err) {
    console.log('err', err);
    res.status(500)
      .json({ success: false, message: err.message });
  }
});

// Get Countries
router.get('/countries', async (req, res) => {
  try {
    let response = await axios.get('https://restcountries.eu/rest/v2/all');
    res.json(response.data);

  } catch (err) {
    console.log('err', err);
    res.status(500)
      .json({ success: false, message: err.message });
  }
});

// Edit an Address
router.put('/addresses/:id', verifyToken, async (req, res) => {
  try {
    let foundAddress = await Address.findOne({ _id: req.params.id });

    if (req.body.user) foundAddress.user = req.decoded._id;
    if (req.body.country) foundAddress.country = req.body.country;
    if (req.body.fullName) foundAddress.fullName = req.body.fullName;
    if (req.body.streetAddress) foundAddress.streetAddress = req.body.streetAddress;
    if (req.body.city) foundAddress.city = req.body.city;
    if (req.body.state) foundAddress.state = req.body.state;
    if (req.body.zipCode) foundAddress.zipCode = req.body.zipCode;
    if (req.body.phoneNumber) foundAddress.phoneNumber = req.body.phoneNumber;
    if (req.body.deliveryInstructions) foundAddress.deliveryInstructions = req.body.deliveryInstructions;
    if (req.body.securityCode) foundAddress.securityCode = req.body.securityCode;

    await foundAddress.save();
    res.json({ success: true, message: 'Successfully updated an address.' });

  } catch (err) {
    console.log('err', err);
    res.status(500)
      .json({ success: false, message: err.message });
  }
});

// Delete an Address
router.delete('/addresses/:id', verifyToken, async (req, res) => {
  try {
    let deletedAddress = await Address.remove({ _id: req.params.id });
    // let deletedAddress = await Address.remove({ _id: req.params.id, user: req.decoded._id });

    if (deletedAddress) {
      res.json({ success: true, message: 'Successfully deleted an address.' });
    }

  } catch (err) {
    console.log('err', err);
    res.status(500)
      .json({ success: false, message: err.message });
  }
});

// Set a default address for a user
router.put('/addresses/set/default', verifyToken, async (req, res) => {
  try {
    const updatedAddressUser = await User.findOneAndUpdate({ _id: req.decoded._id }, { $set: { address: req.body.id } });

    if (updatedAddressUser) {
      res.json({ success: true, message: 'Successfully set this address as a default.' });
    }

  } catch (err) {
    console.log('err', err);
    res.status(500)
      .json({ success: false, message: err.message });
  }
});

module.exports = router;