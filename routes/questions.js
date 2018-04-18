'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwtDecode = require('jwt-decode');
const {SingleLinkedList, insertAt, createWord, insertLast} = require('../ds/SLL');
const questions = require('../db/seed/wordbank.json');

function getUsername (request) {
  const authToken = request.headers.authorization.split(' ')[1];
  const currentUser = jwtDecode(authToken).user.local.username;
  return currentUser;
}

router.get('/generate', (req, res, next) => {
  const username = getUsername(req);

  let sll = new SingleLinkedList();
  User.findOne({'local.username': username})
    .then(user => {
      user.local.words = sll;
      questions.forEach(word => sll.insertFirst(word));
      // add math.random to grab random group of words from the array
      return User.findOneAndUpdate({'local.username': username}, {'local.words': user.local.words}, {new: true});
    })
    .then(result => {
      if (!result) {
        throw new Error('Could not generate words for user');
      }
      return res.json(result);
    })
    .catch(err => next(err));
});

router.get('/question', (req, res, next) => {
  return res.json('What does ♪ Sul Sul mean?');
});

router.post('/answer', (req, res, next) => {
  let { answer } = req.body;
  const username = getUsername(req);
  let feedback = null;

  User.findOne({'local.username': username})
    .then(user => {
      const words = user.local.words;
      const currentWord = words.head;
      let mIndex = words.head.M;

      if (answer === 'Hello') {
        feedback = 'Correct! ♪ Sul Sul means "Hello!" in Simlish.';
        words.head.M = 10;
      } else {
        feedback = 'Try again';
        words.head.M = 2;
      }

      insertAt(words, currentWord, mIndex);
      return User.findOneAndUpdate({'local.username': username}, {'local.words': words}, {new: true});
    })
    .then(() => {
      return res.json(feedback);
    })
    .catch(err => {next(err);});

});

module.exports = router;