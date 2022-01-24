class QElement {
    constructor(element, priority) {
        this.element = element;
        this.priority = priority;
    }
}

class MinPQ {

    /**
     * @type {QElement[]}
     */
    items;
    constructor() {
        this.items = [];
    }

    /**
     * 
     * @param {QElement} element 
     */
    enqueue(element) {
        let found = false;
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            if (element.priority < item.priority) {
                // if new element's priority is less than the one of an item in the queue,
                // insert the new element in fron of the existing one
                this.items.splice(i, 0, element);
                found = true;
                break;
            }
        }

        if (!found) {
            this.items.push(element);
        }
    }

    dequeue() {
        return this.items.shift();
    }

    isEmpty() {
        return this.items.length === 0;
    }

    front() {
        if (!this.isEmpty()) {
            return this.items[0];
        }
        return null;
    }
}

const assert = require('assert');
const pq = new MinPQ();
pq.enqueue(new QElement('B', 2));
pq.enqueue(new QElement('A', 1));
pq.enqueue(new QElement('C', 3));

assert.ok(!pq.isEmpty());
assert.equal(pq.dequeue().element, 'A');
assert.equal(pq.front().element, 'B');
assert.equal(pq.dequeue().element, 'B');
assert.equal(pq.front().element, 'C');
assert.equal(pq.dequeue().element, 'C');
assert.equal(pq.front(), null);
assert.ok(pq.isEmpty());

console.log('All tests passed!');