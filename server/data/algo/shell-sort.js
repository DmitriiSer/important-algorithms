/**
 * 
 * @param {number[]} arr 
 * @returns number[]
 */
const shellSort = (arr) => {
    let h = 1;
    while (h < arr.length / 3) {
        h = 3 * h + 1;
    }
    while (h >= 1) {
        for (let i = h; i < arr.length; i++) {
            for (let j = i; j >= h && arr[j] < arr[j - h]; j -= h) {
                swap(arr, j, j - h);
            }
        }
        h = Math.round(h / 3);
    }
    return arr;
};

/**
 * 
 * @param {number[]} arr 
 * @param {number} i
 * @param {number} j 
 */
const swap = (arr, i, j) => {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

const assert = require('assert');
assert.equal(
    JSON.stringify(shellSort([7, 10, 5, 3, 8, 4, 2, 9, 6])),
    JSON.stringify([2, 3, 4, 5, 6, 7, 8, 9, 10]));
assert.equal(
    JSON.stringify(shellSort([73, -1, 5, -23, -8, 7, 7, 9, 6])),
    JSON.stringify([-23, -8, -1, 5, 6, 7, 7, 9, 73]));
console.log('All tests passed!');