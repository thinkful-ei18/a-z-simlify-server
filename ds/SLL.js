'use strict';
class Word {
  constructor(word, next=null) {
    this.question = word.question;
    this.answer = word.answer;
    this.M = word.M;
    this.next = next;
  }
}

class SingleLinkedList {
  constructor() {
    this.head = null;
  }

  insertFirst(word) {
    this.head = new Word (word, this.head);
  }

  get() {
    return this.head; // return first question/answer pair
  }

  push(word, M) {
    if (M <= 0) {
      return null;
    }

    const foundWord = this.find(M - 1);
    const newWord = new Word(word, null);
    newWord.next = foundWord.next;
    foundWord.next = newWord;
    this.head = this.head.next;
  }

  find(word) {
    let counter = 10;
    let currentWord = this.head;

    if (!this.head) {
      return null;
    }
    while(currentWord.question !== word.question) {
      if (counter <= 0 || currentWord.next === null) {
        return null;
      } else {
        counter--;
        currentWord = currentWord.next;
      }
    }
    return currentWord;
  }

  print() {
    let current = this.head;
    let pretty = '';
    while (current) {
      pretty += `=> Question: ${current.question}, Answer:${current.answer}, M:${current.M} `;
      current = current.next;
    }
    console.log(pretty);
  }

}


const words = [
  {question: 'Sul Sul', answer: 'Hello', M:1},
  {question: 'Dag Dag', answer: 'Goodbye', M:1},
  {question: 'Hooba Noobie', answer: 'What\'s up', M:1},
  {question: 'Litzergam', answer: 'Thank you', M:1},
  {question: 'Geelfrob', answer: 'See you soon', M:1},
  {question: 'Whippna Choba Dog', answer: 'This is cool', M:1},
  {question: 'Boobasnot', answer: 'I don\'t like you', M:1},
  {question: 'Cuh Teekaloo', answer: 'How\'s it going', M:1},
  {question: 'Renato', answer: 'Go away', M:1},
  {question: 'Jowlenin', answer: 'Interesting', M:1},
  {question: 'Kooj', answer: 'Sweet', M:1},
];

function main() {
  let sll = new SingleLinkedList();
  words.map(word => sll.insertFirst(word));
  sll.print();
}
main();