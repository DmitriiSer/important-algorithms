const assert = require('assert');

class LinkedListQueue {

    constructor() {
        this.first = null;
        this.last = null;
    }

    isEmpty() {
        return this.first == null;
    }

    enqueue(data) {
        const oldLast = this.last;
        this.last = new LinkedListQueue.LinkedNode(data);
        if (this.isEmpty()) {
            this.first = this.last;
        } else {
            oldLast.next = this.last;
        }
    }

    dequeue() {
        const oldFirst = this.first;

        if (this.first.next == null) {
            this.first = null;
            this.last = null;
        } else {
            this.first = this.first.next;
        }

        return oldFirst.data;
    }
}
LinkedListQueue.LinkedNode = class LinkedNode {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

module.exports = LinkedListQueue;

const q = new LinkedListQueue();
q.enqueue('A');
q.enqueue('B');
q.enqueue('C');
q.dequeue();
q.enqueue('D');
assert.ok(!q.isEmpty());
q.dequeue();
q.dequeue();
q.dequeue();
assert.ok(q.isEmpty());