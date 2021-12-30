const swap = require('./util').swap;

/**
 * 
 * @param {number[]} arr 
 * @returns number[]
 */
const selectionSort = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        let min = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[min]) {
                min = j;
            }
        }
        swap(arr, i, min);
    }
    return arr;
}

const assert = require('assert');
assert.equal(
    JSON.stringify(selectionSort([7, 10, 5, 3, 8, 4, 2, 9, 6])),
    JSON.stringify([2, 3, 4, 5, 6, 7, 8, 9, 10]));
assert.equal(
    JSON.stringify(selectionSort([73, -1, 5, -23, -8, 7, 7, 9, 6])),
    JSON.stringify([-23, -8, -1, 5, 6, 7, 7, 9, 73]));
console.log('All tests passed!');