'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const localAuth = passport.authenticate('local', {session: false, failWithError: true});
const jwtAuth = passport.authenticate('jwt', { session: false, failWithError: true });
const {JWT_SECRET, JWT_EXPIRY } = require('../config');

function createAuthToken(user) {
  return jwt.sign({ user }, JWT_SECRET, {
    subject: user.local.username,
    expiresIn: JWT_EXPIRY
  });
}

router.post('/login', localAuth, function (req, res) {
  console.info(req.user.local.username, 'successfully logged in.');
  const authToken = createAuthToken(req.user);
  return res.json({ authToken });
});

module.exports = router;