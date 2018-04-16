'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/users/signup/local', (req, res, next) => {

  let { firstname, username, password } = req.body;

  return User.hashPassword(password)
  .then(digest => {
    const newUser = {
      firstname: firstname,
      username: username,
      password: digest,
    }
    return User.create({local: {newUser}})
  })
  .then(result => {
    console.log(result);
    return res.status(201).location(`/users/${result.id}`).json(result);
  })
  .catch(err => {
    if (err.code === 11000) {
      err = new Error('The username already exists');
      err.status = 400;
    }
    next(err);
  });
});

module.exports = router;