class TwoWayTrieNode {

    /**
     * @param {string} char 
     * @param {number} freq 
     * @param {*} left 
     * @param {*} right 
     */
    constructor(char, freq, left, right) {
        if (char != null && char.length !== 1)
            throw new Error('Expected 1 character as the first parameter');
        if (Number.isNaN(freq))
            throw new Error('2nd parameter has to be a number representing character frequency');
        this.char = char;
        this.freq = freq;
        this.left = left;
        this.right = right;
    }

    /**
     * Is node a leaf node of a trie.
     * 
     * @returns true is node is a leaf node, otherwise returns false
     */
    isLeaf() {
        return this.left == null && this.right == null;
    }

    /**
     * Compare nodes by frequency.
     * 
     * @param {TwoWayTrieNode} that 
     * @returns -1 if this node's frequency is less than that node's,
     *           1 if this node's frequency is greater than that node's,
     *           0 if frequencies match.
     */
    compareTo(that) {
        return this.freq - that.freq;
    }
}

module.exports = TwoWayTrieNode;