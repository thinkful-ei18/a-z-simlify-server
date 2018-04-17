'use strict';

const express = require('express');
const router = express.Router();

router.get('questions', (req, res, next) => {
  return res.json('♪ Sul Sul')
    .catch(err => next(err));
});

router.post('questions', (req, res, next) => {

  let { answer } = req.body;

  if (answer === 'Hello') {
    return res.json('Correct! ♪ Sul Sul means "Hello!" in Simlish.');
  } else {
    return res.json('Sorry, try again!');
  }
});