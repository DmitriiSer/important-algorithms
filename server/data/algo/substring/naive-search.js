// Time: O()
// Space: O()

/**
 * @param {string} str 
 * @param {string} substr 
 * @returns {number}
 */
const substringSearch = (str, substr) => {
    const n = str.length;
    const m = substr.length;
    for (let i = 0; i <= n - m; i++) {
        console.log();
        for (let j = 0; j < m; j++) {
            if (str[i + j] !== substr[j]) {
                break;
            }
            console.log();
            if (j === m - 1) {
                return i;
            }
        }
    }
    return -1;
};

const assert = require('assert');

const str = 'abc defg hi jklmnop';
assert.equal(substringSearch(str, 'hi'), 9);
assert.equal(substringSearch(str, 'o'), 17);
assert.equal(substringSearch(str, 'p'), 18);
assert.equal(substringSearch(str, `I'm`), -1);

console.log('All tests passed!');