const express = require('express');
const User = require('../model/user.js');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/verify-token.js');
const router = express.Router();

// Signup route
router.post('/auth/signup', async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.json({ success: false, message: 'Please enter your email and password.' });

  } else {
    try {
      let newUser = new User();
      newUser.name = req.body.name;
      newUser.email = req.body.email;
      newUser.password = req.body.password;
      await newUser.save();
      let token = jwt.sign(newUser.toJSON(), process.env.TOKEN_SECRET, {
        expiresIn: 604800 // 1 week
      });

      res.json({ success: true, token, message: 'Successfully created a new user.' });

    } catch (err) {
      console.log('err', err);
      res.status(500)
        .json({
          success: false,
          message: err.message
        });
    }
  }
});

// Profile route
router.get('/auth/user', verifyToken, async (req, res) => {
  try {
    let foundUser = await User.findOne({ _id: req.decoded._id });

    if (foundUser) {
      res.json({ success: true, user: foundUser });
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

// Update a profile
router.put('/auth/user', verifyToken, async (req, res) => {
  try {
    let foundUser = await User.findOne({ _id: req.decoded._id });

    if (foundUser) {
      if (req.body.name) foundUser.name = req.body.name;
      if (req.body.email) foundUser.email = req.body.email;
      if (req.body.password) foundUser.password = req.body.password;

      await foundUser.save();

      res.json({ success: true, message: 'Successfully updated' });
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

// Login route
router.post('/auth/login', async (req, res) => {
  try {
    let foundUser = await User.findOne({ email: req.body.email });

    if (!foundUser) {
      res.status(403)
        .json({ success: false, message: 'Authentication failed, User not found.' });

    } else {
      if (foundUser.comparePassword(req.body.password)) {
        let token = jwt.sign(foundUser.toJSON(), process.env.TOKEN_SECRET, {
          expiresIn: 604800 // 1 week
        });

        res.json({ success: true, token });

      } else {
        res.status(403)
          .json({ success: false, message: 'Authentication failed, wrong password.' });
      }
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
