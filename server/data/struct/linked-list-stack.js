const res = require("express/lib/response");

class LinkedListStack {

    constructor() {
        this.first = null;
    }

    isEmpty() {
        return this.first == null;
    }

    push(data) {
        const node = new LinkedListStack.LinkedNode(data);
        if (this.first) {
            const oldFirst = this.first;
            this.first = node;
            this.first.next = oldFirst;
        } else {
            this.first = node;
        }
    }

    pop() {
        if (this.first) {
            const oldFirst = this.first;
            this.first = this.first.next;
            return oldFirst.data;
        }
        return null;
    }
}
LinkedListStack.LinkedNode = class LinkedNode {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
};

const stack = new LinkedListStack();
stack.push('A');
stack.push('B');
stack.push('C');
console.log(`Popped ${stack.pop()}`);
stack.push('D');
console.log(`isEmpty => ${stack.isEmpty()}`);
stack.pop();
stack.pop();
stack.pop();
console.log(`isEmpty => ${stack.isEmpty()}`);