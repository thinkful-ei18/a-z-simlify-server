import { Collection } from 'mongoose';

'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  { local: {
    firstname: {type: String},
    username: {type: String, unique: true},
    password: {type: String},
    created: {type: Date, default: Date.Now},
    words: {type: Array}
  },
    google: {
      firstname: {type: String},
      googleId: {type: String},
      password: {type: String},
      created: {type: Date, default: Date.Now},
      words: {type: Array}
    }
  }
);
