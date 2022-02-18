const swap = require('../util').swap;

/**
 * Cyclic sort algorithm only works on numbers from 1 to N.
 * 
 * @param {number[]} arr 
 * @returns number[]
 */
const cyclicSort = (arr) => {
    let i = 0;
    while (i < arr.length) {
        if (i !== arr[i] - 1)
            swap(arr, i, arr[i] - 1);
        else
            i++;
    }
    return arr;
};

const assert = require('assert');
assert.equal(
    JSON.stringify(cyclicSort([3, 5, 2, 1, 4])),
    JSON.stringify([1, 2, 3, 4, 5]));
assert.equal(
    JSON.stringify(cyclicSort([5, 4, 3, 2, 1])),
    JSON.stringify([1, 2, 3, 4, 5]));
assert.equal(
    JSON.stringify(cyclicSort([7, 4, 5, 3, 8, 1, 2, 9, 6])),
    JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9]));
assert.equal(
    JSON.stringify(cyclicSort([1, 2, 5, 3, 6, 4, 7, 9, 8])),
    JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9]));
console.log('All tests passed!');