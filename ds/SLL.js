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

  insertAt(word, M) {
    if (M <= 0) {
      return null;
    }

    const foundWord = this.findWord(M - 1);
    const newWord = new Word(word, null);
    newWord.next = foundWord.next;
    foundWord.next = newWord;
  }

}