const swap = require('./util').swap;

/**
 * 
 * @param {number[]} arr 
 * @returns number[]
 */
const linearShuffle = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        const rnd = Math.floor(Math.random() * (i + 1));
        if (i != rnd) swap(arr, i, rnd);
    }
    return arr;
};

const assert = require('assert');
assert.notEqual(
    JSON.stringify([7, 10, 5, 3, 8, 4, 2, 9, 6]),
    JSON.stringify(linearShuffle([7, 10, 5, 3, 8, 4, 2, 9, 6]))
);
assert.notEqual(
    JSON.stringify([73, -1, 5, -23, -8, 7, 7, 9, 6]),
    JSON.stringify(linearShuffle([73, -1, 5, -23, -8, 7, 7, 9, 6]))
);
console.log('All tests passed!');