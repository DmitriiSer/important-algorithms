class ResizableArrayStack {

    constructor() {
        this.arr = [];
    }

    isEmpty() {
        return this.arr.length === 0;
    }

    push(data) {
        this.arr.push(data);
    }

    pop() {
        return this.arr.pop();
    }

}

const stack = new ResizableArrayStack();
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

