'use strict'

const express = require('express')
const router = express.Router()
const User = require('../models/user')
const jwtDecode = require('jwt-decode')
const { SingleLinkedList, insertAt, createWord, insertLast } = require('../ds/SLL')
const questions = require('../db/seed/wordbank.json')

function getUsername(request) {
  const authToken = request.headers.authorization.split(' ')[1]
  const currentUser = jwtDecode(authToken).user.local.username
  return currentUser
}
// return random 10 wordpairs
function getRandomWords(questions) {
  const max = questions.length
  const result = []
  const indexArr = []
  let index = null
  let wordPair = null
  while (result.length < 10) {
    index = Math.floor(Math.random() * max)
    wordPair = questions[index]
    if (!indexArr.includes(index)) {
      indexArr.push(index)
      result.push(wordPair)
    }
  }
  return result
}

function getRandomGoodFeedback(currentWord) {
  const wordbank = [
    `Correct! ${currentWord.question} means "${currentWord.answer}" in Simlish.`,
    `${currentWord.answer} is correct`,
    `${currentWord.answer} means "${currentWord.question}" in English`
  ]
  return wordbank[Math.floor(Math.random() * 3)]
}

function getRandomBadFeedback(currentWord) {
  const wordbank = [
    `Wrong! It's ${currentWord.answer}`,
    `Repeat after me ${currentWord.answer}!`,
    `Try harder, it's ${currentWord.answer}`
  ]
}
router.get('/generate', (req, res, next) => {
  const username = getUsername(req)
  let sll = new SingleLinkedList()
  User.findOne({ 'local.username': username })
    .then(user => {
      user.local.words = sll
      // add math.random to grab random group of words from the array
      const questionSet = getRandomWords(questions)
      questionSet.forEach(word => sll.insertFirst(word))
      return User.findOneAndUpdate({ 'local.username': username }, { 'local.words': user.local.words }, { new: true })
    })
    .then(result => {
      if (!result) {
        throw new Error('Could not generate words for user')
      }
      return res.json(result)
    })
    .catch(err => next(err))
})

router.get('/question', (req, res, next) => {
  const username = getUsername(req)
  User.findOne({ 'local.username': username }).then(user => {
    if (!user) {
      const err = new Error('User did not find')
      err.status = 404
      return next(err)
    }
    let question
    const { head } = user.local.words
    if (!head) {
      question = null
    }
    question = user.local.words.head.question
    return res.status(200).json({ question })
  })
})

router.post('/answer', (req, res, next) => {
  let { answer } = req.body
  const username = getUsername(req)
  let feedback = null

  User.findOne({ 'local.username': username })
    .then(user => {
      // todo: selections of feedbacks

      const words = user.local.words
      const currentWord = words.head
      let mIndex = words.head.M

      if (answer === currentWord.answer) {
        feedback = getRandomGoodFeedback(currentWord)
        words.head.M *= 2
      } else {
        feedback = getRandomBadFeedback(currentWord)
        words.head.inCorrect += 1
        words.head.M = 2
      }
      words.head.totalAttempt += 1
      insertAt(words, currentWord, mIndex)
      return User.findOneAndUpdate({ 'local.username': username }, { 'local.words': words }, { new: true })
    })
    .then(result => {
      return res.json(result)
    })
    .catch(err => {
      next(err)
    })
})
//todo:
// router.get('/report')
// res.json(result)

module.exports = router
