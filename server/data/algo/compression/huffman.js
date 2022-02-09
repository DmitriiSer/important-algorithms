const assert = require('assert');

const fs = require('fs');

const { MinPriorityQueue } = require('datastructures-js');

const BinaryReader = require('./binary-reader');
const BinaryWriter = require('./binary-writer');
const TwoWayTrieNode = require('./two-way-trie-node');

class HuffmanEncoder {

    /**
     * Alphabet radix
     */
    static R = 255; // extended ASCII
    /**
     * @type {BufferEncoding}
     */
    static encoding = 'ascii';

    /**
     * @type {BinaryReader}
     */
    #bitReader;
    /**
    * @type {BinaryWriter}
    */
    #bitWriter;
    #chars;

    /**
     * Compresses a string or a byte buffer using Huffman encoding.
     * 
     * @param {string | Buffer} strOrBuffer contains a string or a byte Buffer to compress
     * @returns {Buffer}
     */
    compress(strOrBuffer) {
        let str;
        if (typeof strOrBuffer === 'string') {
            str = strOrBuffer;
        } else {
            str = strOrBuffer.toString(HuffmanEncoder.encoding);
        }
        // build character frequency and code map
        this.#chars = {};
        for (let i = 0; i < str.length; i++) {
            const char = str.charAt(i);
            this.#chars[char] = char in this.#chars ? { f: this.#chars[char].f + 1 } : { f: 1 };
        }

        // build Huffman trie
        const trie = this.#buildTrie();

        // print trie for decoder
        this.#bitWriter = new BinaryWriter();
        this.#writeTrie(trie);

        // print number of bytes in original uncompressed message
        this.#bitWriter.writeInt(str.length);

        // use Huffman code to encode input
        for (let i = 0; i < str.length; i++) {
            const char = str.charAt(i);
            const code = this.#chars[char].enc;
            for (let j = 0; j < code.length; j++) {
                if (code.charAt(j) === '0') {
                    this.#bitWriter.writeBit(false);
                }
                else if (code.charAt(j) === '1') {
                    this.#bitWriter.writeBit(true);
                }
                else {
                    throw new Error("Illegal state");
                }
            }
            // console.log(`Encoded character ${char} with ${code}: ${this.#bitWriter.getBitsAsBinaryString(true)}`);
        }
        const buffer = this.#bitWriter.getBuffer();
        // console.log(`Encoded bytes:`, this.#bitWriter.getBuffer());
        // console.log(`Encoded bits: ${this.#bitWriter.getBitsAsBinaryString()}`);
        return buffer;
    }

    /**
     * Compresses a file using Huffman encoding.
     * 
     * @param {string} src contains the source file name
     * @param {string} dest contains the destinatioc file name
     * @returns {Buffer}
     */
    compressFile(src, dest) {
        // read the file
        const readBuf = fs.readFileSync(src);
        const buf = this.compress(readBuf.toString(HuffmanEncoder.encoding));

        // write compressed buffer to the destination file
        fs.writeFileSync(dest, buf);

        return buf;
    }

    /**
     * Expands a string or a byte buffer using Huffman decoding.
     * @param {string | Buffer} strOrBuffer contains a string or a byte Buffer to expand
     * @returns {Buffer}
     */
    expand(strOrBuffer) {
        let buf;
        if (typeof strOrBuffer === 'string') {
            buf = Buffer.from(strOrBuffer, HuffmanEncoder.encoding);
        } else {
            buf = strOrBuffer;
        }

        // read character trie
        this.#bitReader = new BinaryReader(buf);
        const root = this.#readTrie();

        // read number of bytes in compressed message
        let n = this.#bitReader.readInt();

        // use Huffman code to encode input
        let buffer = Buffer.alloc(n);
        let trie = root;
        let byte = 0;
        while (!this.#bitReader.isEOF() && byte < n) {
            const bit = this.#bitReader.readBit();
            trie = bit ? trie.right : trie.left;

            if (trie.char !== '\0') {
                const charCode = trie.char.charCodeAt(0);
                buffer.writeUInt8(charCode, byte++);
                trie = root;
            }
        }

        return buffer;
    }

    /**
     * Expands a file using Huffman decoding.
     * 
     * @param {string} src contains the source file name
     * @param {string} dest contains the destinatioc file name
     * @returns {Buffer}
     */
    expandFile(src, dest) {
        // read the file
        const readBuf = fs.readFileSync(src);
        const buf = this.expand(readBuf);

        // write expanded buffer to the destination file
        fs.writeFileSync(dest, buf);

        return buf;
    }

    /**
    * 
    * @returns {TwoWayTrieNode}
    */
    #buildTrie() {
        const nodeComparator = (a, b) => {
            const d = a.freq - b.freq;
            return d; // === 0 ? a.char.charCodeAt(0) - b.char.charCodeAt(0) : d;
        };

        const pq = new MinPriorityQueue({
            compare: nodeComparator
        });
        for (let i = 0; i < HuffmanEncoder.R; i++) {
            const char = String.fromCharCode(i);
            if (char in this.#chars) {
                pq.enqueue(new TwoWayTrieNode(char, this.#chars[char].f, null, null));
            }
        }

        while (pq.size() > 1) {
            const left = pq.dequeue();
            const right = pq.dequeue();
            const parent = new TwoWayTrieNode('\0', left.freq + right.freq, left, right);
            this.#addNodePrefix(parent, '');
            pq.enqueue(parent);
        }
        return pq.dequeue();
    }

    /**
     * Calculates character encoding prefixes.
     * 
     * @param {TwoWayTrieNode} node 
     */
    #addNodePrefix(node, pfx) {
        if (node != null) {
            if (node.left != null) {
                this.#addNodePrefix(node.left, pfx + '0');
            }
            if (node.right != null) {
                this.#addNodePrefix(node.right, pfx + '1');
            }
            if (node.char !== '\0') {
                this.#chars[node.char].enc = pfx;
                // this.#chars[node.char].enc = this.#chars[node.char].enc === undefined ? pfx : pfx + this.#chars[node.char].enc;
            }
        }
    }

    /**
     * Writes compressed character trie to a file.
     * 
     * @param {TwoWayTrieNode} node 
     */
    #writeTrie(node) {
        if (node.isLeaf()) {
            this.#bitWriter.writeBit(true);
            // console.log('Leaf:', this.#bitWriter.getBitsAsString(true));
            this.#bitWriter.writeChar(node.char);
            // console.log(`Leaf char[${node.char}], code[${node.char.charCodeAt(0)}]:`, this.#bitWriter.getBitsAsString(true));
            return;
        }
        this.#bitWriter.writeBit(false);
        // console.log('Parent node:', this.#bitWriter.getBitsAsString(true));
        this.#writeTrie(node.left);
        this.#writeTrie(node.right);
    }

    /**
     * Reads encoded characters from a file to a trie.
     * 
     * @returns {TwoWayTrieNode}
     */
    #readTrie() {
        let left, right;
        if (this.#bitReader.readBit()) {
            const c = this.#bitReader.readChar(8);
            return new TwoWayTrieNode(c, 0, null, null);
        }

        left = this.#readTrie();
        right = this.#readTrie();

        return new TwoWayTrieNode('\0', 0, left, right);
    }
}

const origString = 'ABRACADABRA!';
const origFilename = './server/assets/orig.txt';
const compressedFilename = './server/assets/compressed.huff';
const expandedFilename = './server/assets/expanded.txt';
const he = new HuffmanEncoder();
const compressedBuffer = he.compress(origString);
const compressedStr = compressedBuffer.toString(HuffmanEncoder.encoding);
he.compressFile(origFilename, compressedFilename);
const compressedFileBuffer = fs.readFileSync(compressedFilename);
const compressedFileStr = compressedFileBuffer.toString(HuffmanEncoder.encoding);

assert.equal(compressedStr, compressedFileStr);

const expandedBuffer = he.expand(compressedBuffer);
const expandedStr = expandedBuffer.toString(HuffmanEncoder.encoding);
assert.equal(origString, expandedStr);

const expandedFileBuffer = he.expandFile(compressedFilename, expandedFilename);
const expandedFileStr = expandedFileBuffer.toString(HuffmanEncoder.encoding);

assert.equal(expandedStr, expandedFileStr);

console.log('All tests passed!');