const swap = require('../util').swap;

/**
 * 
 * @param {number[]} arr 
 * @returns number[]
 */
const insertionSort = (arr, lo = 0, hi = arr.length - 1) => {
    for (let i = lo + 1; i <= hi; i++) {
        for (let j = i; j > lo; j--) {
            if (arr[j] < arr[j - 1]) {
                swap(arr, j, j - 1);
            } else break;
        }
    }
    return arr;
};

const assert = require('assert');
assert.equal(
    JSON.stringify(insertionSort([7, 10, 5, 3, 8, 4, 2, 9, 6])),
    JSON.stringify([2, 3, 4, 5, 6, 7, 8, 9, 10]));
assert.equal(
    JSON.stringify(insertionSort([73, -1, 5, -23, -8, 7, 7, 9, 6])),
    JSON.stringify([-23, -8, -1, 5, 6, 7, 7, 9, 73]));
console.log('All tests passed!');

module.exports = insertionSort;