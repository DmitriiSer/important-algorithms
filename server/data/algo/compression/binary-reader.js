const fs = require('fs');

class BitReader {

    #filename;
    #buffer;
    #bitPos;
    #bytePos;
    #curByte;

    constructor(filename) {
        this.#filename = filename;
        this.#buffer = fs.readFileSync(this.#filename);
    }

    size() {
        return this.#buffer.length;
    }

    /**
     * Reads one bit at a time.
     * @returns {boolean}
     */
    readBit() {
        if (this.#curByte == null || this.#bitPos === 8) {
            this.#bitPos = 0;
            this.#bytePos = this.#curByte == null ? 0 : this.#bytePos + 1;
            this.#curByte = this.#buffer.readUInt8(this.#bytePos);
        }

        const bits = this.#byteToPAddedBitsString(this.#curByte);
        const val = bits[this.#bitPos] === '1';
        this.#bitPos++;
        return val;
    }

    readChar(bits) {
        let str = '';
        for (let i = 0; i < bits; i++) {
            str += this.readBit() ? '1' : '0';
        }
        
        var charCode = parseInt(str.split('').reverse().join(''), 2);
        str = String.fromCharCode(charCode);
        return str;
    }

    #byteToPAddedBitsString(num) {
        return (num >>> 0).toString(2).padStart(8, '0');
    }
}

module.exports = BitReader;