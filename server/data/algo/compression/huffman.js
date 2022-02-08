const tmp = require('tmp');
const fs = require('fs');

const { MinPriorityQueue } = require('datastructures-js');

const BinaryReader = require('./binary-reader');
const BinaryWriter = require('./binary-writer');
const TwoWayTrieNode = require('./two-way-trie-node');

class HuffmanEncoder {

    static R = 255;

    /**
     * @type {BinaryReader}
     */
    #bitReader;
    /**
    * @type {BinaryWriter}
    */
    #bitWriter;
    #chars;

    constructor() {
    }

    /**
     * 
     * @param {string} str 
     */
    compressString(str) {
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
        for (let i = 0; i < this.#bitReader.size(); i++) {
            const byte = this.#bitReader.byteAt(i);
            const char = String.fromCharCode(byte);
            const code = this.#chars[char].enc;
            for (let j = 0; j < code.length; j++) {
                if (code.charAt(j) === '0') {
                    this.#bitWriter.writeBit(false);
                }
                else if (code.charAt(j) === '1') {
                    this.#bitWriter.writeBit(true);
                }
                else throw new Error("Illegal state");
            }
        }
    }

    /**
     * Compresses a file using Huffman encoding.
     * 
     * @param {string} src contains the source file name
     * @param {string} dest contains the destinatioc file name
     */
    compressFile(src, dest) {
        // read the file
        this.#bitReader = new BinaryReader(src);

        // build character frequency and code map
        this.#chars = {};
        while (!this.#bitReader.isEOF()) {
            const char = this.#bitReader.readChar();
            this.#chars[char] = char in this.#chars ? { f: this.#chars[char].f + 1 } : { f: 1 };
        }

        // build Huffman trie
        const trie = this.#buildTrie();

        // print trie for decoder
        const tmpobj = tmp.fileSync();
        this.#bitWriter = new BinaryWriter(tmpobj.fd);
        this.#writeTrie(trie);

        // print number of bytes in original uncompressed message
        this.#bitWriter.writeInt(this.#bitReader.size());

        // use Huffman code to encode input
        for (let i = 0; i < this.#bitReader.size(); i++) {
            const byte = this.#bitReader.byteAt(i);
            const char = String.fromCharCode(byte);
            const code = this.#chars[char].enc;
            for (let j = 0; j < code.length; j++) {
                if (code.charAt(j) === '0') {
                    this.#bitWriter.writeBit(false);
                }
                else if (code.charAt(j) === '1') {
                    this.#bitWriter.writeBit(true);
                }
                else throw new Error("Illegal state");
            }
        }

        // copy content of the temp file to the dest file
        fs.copyFileSync(tmpobj.name, dest);

        // remove temp file
        tmpobj.removeCallback();

        // remove temp file
        const buf = fs.readFileSync(dest);
        console.log(buf);
        // TODO: close output stream
        // this.#bitReader.close();
    }

    /**
     * Expands a file using Huffman encoding.
     * 
     * @param {string} src contains the source file name
     * @param {string} dest contains the destinatioc file name
     */
    expand(src, dest) {
        // read character trie
        this.#bitReader = new BinaryReader(src);
        const root = this.#readTrie();

        const bytesToRead = 1;

        let n;

        // let readFd;
        // try {
        //     readFd = fs.openSync(this.#filename, 'r');
        //     const buffer = Buffer.alloc(bytesToRead);
        //     fs.readSync(readFd, buffer, 0, bytesToRead, 0);
        //     n = +buffer.toString('utf8');

        //     if (Number.isInteger(n)) {
        //         const tmpobj = tmp.fileSync();
        //         if (tmpobj.fd) {
        //             const writeFd = tmpobj.fd;
        //             console.log('Temp file name: ' + tmpobj.name);

        //             let writePos = 0;
        //             for (let i = 0; i < n; i++) {
        //                 let x = root;
        //                 while (!x.isLeaf()) {
        //                     x = true ? x.left : x.right;
        //                 }
        //                 fs.writeSync(writeFd, Buffer.from(x.char), 0, bytesToRead, writePos);
        //                 writePos++;
        //             }
        //         }
        //     }
        // } catch (err) {
        //     console.log(err.message);
        // } finally {
        //     if (readFd !== undefined) fs.closeSync(readFd);
        // }
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
            this.#bitWriter.writeChar(node.char);
            return;
        }
        this.#bitWriter.writeBit(false);
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

const origFilename = './server/assets/orig.txt';
const he = new HuffmanEncoder();
he.compressString('ABRACADABRA!');
// he.compressFile(origFilename, './server/assets/compressed.huff');
// he.compress('./server/assets/compressed.huff', './server/assets/compressed.huff');
// he.expand('./server/assets/compressed.huff', './server/assets/expanded.txt');
// he.expand();