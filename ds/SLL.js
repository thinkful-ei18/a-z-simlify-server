'use strict'
class Word {
  constructor(word, next = null) {
    this.question = word.question
    this.answer = word.answer
    this.M = word.M
    this.next = next
    this.totalAttempt = 0
    this.inCorrect = 0
  }
}

class SingleLinkedList {
  constructor() {
    this.head = null
  }

  insertFirst(word) {
    this.head = new Word(word, this.head)
  }

  print() {
    let current = this.head
    let pretty = ''
    while (current) {
      pretty += `=> Question: ${current.question}, Answer:${current.answer}, M:${current.M}, next: ${current.next} `
      current = current.next
    }
    console.log(pretty)
  }
}

function createWord(word, next = null) {
  return {
    question: word.question,
    answer: word.answer,
    M: word.M,
    next: next,
    totalAttempt: word.totalAttempt,
    inCorrect: word.inCorrect
  }
}

function insertAt(words, word, M) {
  let temp = words.head
  let counter = 0

  if (M > 9) {
    insertLast(words, word)
  }

  while (counter < M) {
    if (temp.next === null) {
      return null
    }

    temp = temp.next
    counter++
  }

  words.head = words.head.next
  temp.next = createWord(word, temp.next)

  counter = 0
  temp = words.head

  while (counter < 9) {
    temp = temp.next
    counter++
  }
  temp.next = null
}

function insertLast(words, word) {
  let node = words.head

  while (node.next !== null) {
    node = node.next
  }

  node.next = createWord(word)
}

module.exports = { SingleLinkedList, insertAt, createWord, insertLast }

const words = [
  { question: 'Sul Sul', answer: 'Hello', M: 1 },
  { question: 'Hooba Noobie', answer: 'What\'s up', M: 1 },
  { question: 'Dag Dag', answer: 'Goodbye', M: 1 },
  { question: 'Litzergam', answer: 'Thank you', M: 1 },
  { question: 'Geelfrob', answer: 'See you soon', M: 1 },
  { question: 'Whippna Choba Dog', answer: 'This is cool', M: 1 },
  { question: 'Boobasnot', answer: 'I don\'t like you', M: 1 },
  { question: 'Cuh Teekaloo', answer: 'How\'s it going', M: 1 },
  { question: 'Renato', answer: 'Go away', M: 19 },
  { question: 'Jowlenin', answer: 'Interesting', M: 1 },
  { question: 'Kooj', answer: 'Sweet', M: 1 }
]

function main() {
  let sll = new SingleLinkedList()
  words.map(word => sll.insertFirst(word))

  sll.print()
  console.log('*********************************************')
  insertLast(sll, words[3])
  sll.print()
  // insertAt(sll, sll.head, sll.head.M);
  // console.log(sll);
  // sll.print();
  // // console.log(sll.get());
  // sll.insertAt(sll.get(), sll.get().M);
  // sll.print();
  // console.log('*********************************************');
  // sll.insertAt(sll.get(), sll.get().M);
  // sll.print();
  // console.log('*********************************************');
  // sll.insertAt(sll.get(), sll.get().M);
  // sll.print();

  // console.log(sll);
}
// main();
