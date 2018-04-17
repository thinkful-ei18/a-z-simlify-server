'use strict';

class _Node {
  constructor(value, next, prev) {
    this.value=value,
    this.next=next,
    this.prev = prev;
  }
}

module.exports = _Node;