'use strict';

const _Node = require('./node');

class DLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }
  insertFirst(item){
    let newNode = new _Node(item, this.head, null);
    if(this.head !== null ){
      this.head.prev = newNode;
    }
    this.head = newNode;
    if(this.tail === null){
      this.tail = newNode;
    }
  }
  insertLast(item){
    let newNode = new _Node(item, null, this.tail);
    if(this.tail !== null){
      this.tail.next = newNode;
    }
    this.tail = newNode;
    if(this.head === null ){
      this.head = newNode;
    }
  }
  remove(item){
    if (!this.head){
      return null;
    }
    let current = this.head;
    while(current.value !== item){
      current = current.next;
      if(current === null){
        console.log('Item to remove is not on the list');
        return null;
      }
    }
    //found it - now remove it

    //if the node to be removed is head, make the next node head
    if(current === this.head){
      this.head = current.next;
      //return;
    } else{
      current.prev.next = current.next;
    }

    //delete last node
    if(current === this.tail){
      this.tail = current.prev;
    } else{
      current.next.prev = current.prev;
    }
  }
}


function displayList(list){
  let currNode = list.head;
  while (currNode !== null) {
    console.log(currNode.value);
    currNode = currNode.next;
  }
}

function size(lst){
  let counter = 0;
  let currNode = lst.head;
  if(!currNode){
    return counter;
  }
  else
    counter++;
  while (!(currNode.next == null)) {
    counter++;
    currNode = currNode.next;
  }
  return counter;
}

function reverseDLL(lst) {
  let currNode = lst.head;
  let tempNode = null;

  while (currNode !== null) {
    //swapping nodes
    tempNode = currNode.next;
    currNode.next = currNode.prev;
    currNode.prev = tempNode;

    currNode = tempNode;
  }
  tempNode = lst.head;
  lst.head = lst.tail;
  lst.tail = tempNode;
}

module.exports = DLinkedList, displayList, size, reverseDLL;