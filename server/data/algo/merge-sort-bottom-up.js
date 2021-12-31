const assert = require('assert');
const merge = require('./merge-sort').merge;

/**
 * 
 * @param {number[]} arr 
 * @returns number[]
 */
const mergeSortBottomUp = (arr) => {

    const aux = [];
    for (let k = 0; k < arr.length; k++) {
        aux[k] = arr[k];
    }

    for (let sz = 1; sz < arr.length; sz += sz) {
        for (let lo = 0; lo < arr.length - sz; lo += 2 * sz) {
            const hi = Math.min(lo + 2 * sz - 1, arr.length - 1);
            const mid = lo + sz - 1;
            merge(arr, aux, lo, mid, hi);
        }
    }

    return arr;
};

let arr = [3, 7, 8, 9, 10, 4, 6, 11, 12];
mergeSortBottomUp(arr);
assert.deepEqual(arr, [3, 4, 6, 7, 8, 9, 10, 11, 12]);
arr = [7, 10, 5, 3, 8, 4, 2, 9, 6];
mergeSortBottomUp(arr);
assert.deepEqual(arr, [2, 3, 4, 5, 6, 7, 8, 9, 10]);
arr = [73, -1, 5, -23, -8, 7, 7, 9, 6];
mergeSortBottomUp(arr);
assert.deepEqual(arr, [-23, -8, -1, 5, 6, 7, 7, 9, 73]);
console.log('All tests passed!');