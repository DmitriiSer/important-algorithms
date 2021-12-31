const assert = require('assert');
const isSorted = require('./util').isSorted;

/**
 * 
 * @param {number[]} arr 
 */
const merge = (arr, aux, lo, mid, hi) => {
    assert(isSorted(arr, lo, mid));
    assert(isSorted(arr, mid + 1, hi));

    for (let i = lo; i <= hi; i++) {
        aux[i] = arr[i];
    }

    let i = lo, j = mid + 1;
    for (let k = lo; k <= hi; k++) {
        if (i > mid) arr[k] = aux[j++];
        else if (j > hi) arr[k] = aux[i++];
        else if (aux[j] < aux[i]) arr[k] = aux[j++];
        else arr[k] = aux[i++];
    }
    assert(isSorted(arr, lo, hi));
};

/**
 * 
 * @param {number[]} arr 
 * @returns number[]
 */
const mergeSort = (arr, aux = [], lo = 0, hi = arr.length - 1) => {
    if (hi <= lo) {
        return;
    }
    const mid = ((hi - lo) / 2 | 0) + lo;
    mergeSort(arr, aux, lo, mid);
    mergeSort(arr, aux, mid + 1, hi);
    // practical improvement - check if both sides are already sorted
    if (arr[mid] < arr[mid + 1]) return;
    merge(arr, aux, lo, mid, hi);
};

module.exports = {
    merge: merge,
    mergeSort: mergeSort
};

let arr = [3, 7, 8, 9, 10, 4, 6, 11, 12];
mergeSort(arr);
assert.deepEqual(arr, [3, 4, 6, 7, 8, 9, 10, 11, 12]);
arr = [7, 10, 5, 3, 8, 4, 2, 9, 6];
mergeSort(arr);
assert.deepEqual(arr, [2, 3, 4, 5, 6, 7, 8, 9, 10]);
arr = [73, -1, 5, -23, -8, 7, 7, 9, 6];
mergeSort(arr);
assert.deepEqual(arr, [-23, -8, -1, 5, 6, 7, 7, 9, 73]);
console.log('All tests passed!');