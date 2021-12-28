/**
 * 
 * @param {number[]} a 
 * @param {number} key 
 * 
 * Constraints: The array of numbers has to be sorted in ascending order
 * 
 * Example: key = 33
 *          arr = 6 13 14 25 33 43 51 53 64 72 84 93 95 96 97
 * Pass #1: Middle is {53} =>         ^ (53 is greater than 33, use the left side of the array)
 *          arr =             6 13 14 25 33 43 51
 * Pass #2: Middle is {25} =>         ^ (25 is less than 33, use the right side of the array)
 *          arr =                  33 43 51
 * Pass #3: Middle is {43} =>         ^ (43 is greater than 33, use the left side of the array)
 *          arr =                     33
 * Pass #4: There is one key {33} =>  (33 equals to the key, search is complete, we found the value)
 */
const binarySearch = (a, key) => {
    // set Low and High indexes of the 
    let lo = 0;
    let hi = a.length - 1;
    while (lo <= hi) {
        const mid = lo + (hi - lo) / 2;
        if (a[mid] > key) hi = mid - 1;
        else if (a[mid] < key) lo = mid + 1;
        else return mid;
    }
    return -1;
};

const assert = require('assert');
const arr = [6, 13, 14, 25, 33, 43, 51, 53, 64, 72, 84, 93, 95, 96, 97];
assert.equal(binarySearch(arr, 33), 4); // returns 4 since it's the index of then number that matches 33
assert.equal(binarySearch(arr, 34), -1); // returns -1 since there is no match in the array