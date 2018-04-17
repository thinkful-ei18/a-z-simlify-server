'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/generate', (req, res, next) => {
  let {username } = req.body;

  User.findOne({local: username})
    .then(res => {
      return res.json(res);
    })
    .catch(err => next(err));
});

router.get('/question', (req, res, next) => {
  return res.json('What does ♪ Sul Sul mean?');
});

router.post('/answer', (req, res, next) => {
  let { answer } = req.body;

  if (answer === 'Hello') {
    return res.json('Correct! ♪ Sul Sul means "Hello!" in Simlish.');
  } else {
    return res.json('Sorry, try again!');
  }
});

module.exports = router;