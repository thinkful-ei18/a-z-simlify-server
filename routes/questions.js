'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/generate', (req, res, next) => {
   let {username } = req.body;

  User.findOne({});
});

router.get('/questions', (req, res, next) => {
  return res.json('What does ♪ Sul Sul mean?');
});

router.post('/questions', (req, res, next) => {
  let { answer } = req.body;

  if (answer === 'Hello') {
    return res.json('Correct! ♪ Sul Sul means "Hello!" in Simlish.');
  } else {
    return res.json('Sorry, try again!');
  }
});

module.exports = router;