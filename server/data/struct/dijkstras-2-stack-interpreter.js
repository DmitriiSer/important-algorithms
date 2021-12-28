const { receiveMessageOnPort } = require('worker_threads');

/**
 * This class is a simple interpreter that calculates mathematical expressions containing operators and operands.
 * This is also an example of Dijkstra's two-stack algorithm.
 */
class TwoStackInterpreter {

    static numRegEx = /^\s{0,}(\d+)\s{0,}/;
    static operatorRegEx = /^\s{0,}([\+\-\*\/])\s{0,}/;
    static rightParenRegEx = /^\s{0,}\)\s{0,}/;

    constructor() {
    }

    /**
     * 
     * @param {string} expression 
     */
    calculate(expression) {
        this.operandStack = [];
        this.operatorStack = [];

        let token, exp = expression;
        while (exp.length > 0) {
            const res = this.getNextToken(exp);
            switch (res.type) {
                case 'value':
                    this.operandStack.push(res.token);
                    break;
                case 'operator':
                    this.operatorStack.push(res.token);
                    break;
            }
            exp = res.expression;
        }
        while (this.operandStack.length !== 1) {
            this.compute();
        }
        return this.operandStack[0];
    }

    getNextToken(exp) {
        // check if expression starts with a value
        let match = exp.match(TwoStackInterpreter.numRegEx);
        if (match) {
            return {
                token: match[1],
                type: 'value',
                expression: exp.substr(match[0].length)
            };
        }
        // check if expression starts with an operator
        match = exp.match(TwoStackInterpreter.operatorRegEx);
        if (match) {
            return {
                token: match[1],
                type: 'operator',
                expression: exp.substr(match[0].length)
            };
        }
        // check if expression starts with a right parenthesis
        match = exp.match(TwoStackInterpreter.rightParenRegEx);
        if (match) {
            this.compute();
        }
        return { expression: exp.substr(1) };
    }

    compute() {
        if (this.operandStack.length !== 1 || this.operatorStack.length !== 0) {
            if (this.operandStack.length < 2 && this.operatorStack.length < 1) {
                throw new Error('Please check parenthesis within expression');
            }
            // pop 2 last values and one operator and perform computation
            const n1 = this.operandStack.pop();
            const n2 = this.operandStack.pop();
            const op = this.operatorStack.pop();
            this.operandStack.push(eval(n1 + op + n2));
        }
    }

}


const interpreter = new TwoStackInterpreter();

require('assert').equal(interpreter.calculate('1 + ((2 + 3) * (4*5)))'), 101);
require('assert').equal(interpreter.calculate('(1 + ((2 + 3) * (4*5))))'), 101);
require('assert').equal(interpreter.calculate('1 + 2 + 3'), 6);
require('assert').equal(interpreter.calculate('1 * 2 + 3'), 5);
require('assert').equal(interpreter.calculate('1 + 2 * 3'), 7);
require('assert').equal(interpreter.calculate('(1 + 2) * 3'), 9);

console.log('All tests passed!');