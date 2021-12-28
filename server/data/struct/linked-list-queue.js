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

const q = new LinkedListQueue();
q.enqueue('A');
q.enqueue('B');
q.enqueue('C');
console.log(`Dequeued ${q.dequeue()}`);
q.enqueue('D');
console.log(`isEmpty => ${q.isEmpty()}`);
q.dequeue();
q.dequeue();
q.dequeue();
console.log(`isEmpty => ${q.isEmpty()}`);