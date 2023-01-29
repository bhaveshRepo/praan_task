const { validationResult } = require("express-validator");
const encrypt = require('crypto')
const { v4: uuid } = require('uuid')
const jwt = require("jsonwebtoken");
const User = require('../model/user');
require('dotenv').config();

exports.signUp = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      err: errors.array(),
    });
  }

  let { username, email, password } = req.body;

  let salt = uuid();

  password = `${salt}${password}`

  let hash = encrypt.createHmac('sha256', process.env.ENCRYPT_KEY)
    .update(password)
    .digest('hex')

  const data = { username, email, password: hash, salt };

  const user = new User(data);

  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "not able to save user in DB",
      });
    }

    res.json({
      name: user.username,
      email: user.email,
    });
  });
}

exports.signIn = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      err: errors.array(),
    });
  }

  let { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || user == null) {
      return res.status(400).json({
        error: "User email does not exist ",
      });
    }

    password = `${user.salt}${password}`

    let hash = encrypt.createHmac('sha256', process.env.ENCRYPT_KEY)
      .update(password)
      .digest('hex')

    if (user.password != hash) {
      return res.status(401).json({
        error: "Email and password do not match",
      });
    }


    const token = jwt.sign({ _id: user._id, _user: user.username }, process.env.JWT_KEY, { expiresIn: '1h' })

    // sending response to Client
    let { _id, username, email } = user;

    return res.status(200).json({
      token,
      user: { _id, username, email },
    });
  });

}