'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwtDecode = require('jwt-decode');

function getUsername (request) {
  const authToken = request.headers.authorization.split(' ')[1];
  const currentUser = jwtDecode(authToken).user.local.username;
  return currentUser;
}

router.get('/generate', (req, res, next) => {

  const username = getUsername(req);
  console.log('found user:', username);

  User.findOne({'local.username': username}, {'local.words': 1})
    .then(user => {
      const words = user.local.words;

      if (!user) {
        throw new Error('Could not words for this user');
      }
      return res.json(words);
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