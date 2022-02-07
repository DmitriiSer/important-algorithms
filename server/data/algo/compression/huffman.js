const BinaryReader = require('./binary-reader');
const TwoWayTrieNode = require('./two-way-trie-node');

class HuffmanEncoder {

    #bitReader;
    /**
     * 
     * @param {string} filename 
     */
    constructor(filename) {
        this.#bitReader = new BinaryReader(filename);
    }

    /**
     * Compress a file using Huffman encoding.
     */
    compress() {

    }

    expand() {
        // read character trie
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
    #readTrie() {        
        if (this.#bitReader.readBit()) {
            const c = this.#bitReader.readChar(8);
            return new TwoWayTrieNode(c, 0, null, null);
        }

        const left = this.#readTrie();
        const right = this.#readTrie();
        return new TwoWayTrieNode('\0', 0, left, right);
    }
}

const filename = './server/assets/compressed.txt';
const he = new HuffmanEncoder(filename);
he.expand();