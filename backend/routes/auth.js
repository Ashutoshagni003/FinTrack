const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const JWT_SECRET = 'Ashutoshisagoodb$oy';
const { body, validationResult } = require('express-validator');
const fetchUser = require('../middleware/auth');

router.post('/register',[
    body('name','enter a valid name').isLength({min:3}),
    body('email','enter a valid email').isEmail(),
    body('password','Password must be atleast 5 characters').isLength({min:5})
], async (req, res) => {
  const { name, email, password } = req.body;
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success , msg: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password,
    });

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };


    jwt.sign(payload, JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      success = true;
      res.json({ success , token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/login', [
    // body('name','enter a valid name').isLength({min:3}),
    body('email','enter a valid email').isEmail(),
    body('password','Password cannot be blank').exists(),
],async (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }

  try {
    let success = false;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({success ,  msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({success, msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      success = true;
      res.json({ success,token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// router.get('/me', fetchUser, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select('-password');
//     console.log(user)
//     res.json(user);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });
router.get('/me', fetchUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
