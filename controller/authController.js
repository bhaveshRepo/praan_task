const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const User = require('../model/user')


exports.signUp = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      err: errors.array(),
    });
  }


  const user = new User(req.body);

  user.save((err, user) => {
    if (err) {
      console.log(err);
      return res.status(400).send({
        err: "not able to save user in DB",
      });
    }
    res.json({
      name: user.name,
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

  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(400).json({
        error: "User email does not exist ",
      });
    }

    if (user.password != req.body.password) {
      return res.status(401).json({
        error: "Email and password do not match",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);

    // put token in cookie

    res.cookie("token", token, { expire: new Date() + 9999 });

    // sending response to front end
    const { _id, name, email, role } = user;

    return res.status(200).json({
      token,
      user: { _id, name, email, role },
    });
  });

}