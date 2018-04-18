'use strict';
class Word {
  constructor(word, next=null) {
    this.question = word.question;
    this.answer = word.answer;
    this.m = word.m;
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

}