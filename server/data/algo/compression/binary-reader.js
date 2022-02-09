const fs = require('fs');

class BinaryReader {

    #filename;
    #buffer;
    #bitPos;
    #bytePos;
    #curByte;
    #strBits;

    /**
     * 
     * @param {string | Buffer} filenameOrBuffer 
     */
    constructor(filenameOrBuffer) {
        if (typeof filenameOrBuffer === 'string') {
            this.#filename = filenameOrBuffer;
            this.#buffer = fs.readFileSync(this.#filename);
        } else {
            this.#buffer = filenameOrBuffer;
        }
        this.#strBits = '';
        for (let i = 0; i < this.#buffer.length; i++) {
            const byte = this.#buffer[i];
            this.#strBits += byte.toString(2).padStart(8, '0');
        }
    }

    size() {
        return this.#buffer.length;
    }

    isEOF() {
        return this.#bytePos === this.size() - 1 && this.#bitPos === 8;
    }

    byteAt(i) {
        return this.#buffer[i];
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

        const bits = this.#byteToPaddedBitsString(this.#curByte);
        const val = bits[this.#bitPos] === '1';
        this.#bitPos++;
        return val;
    }

    readChar(bits = 8) {
        let str = '';
        for (let i = 0; i < bits; i++) {
            if (this.#bytePos === this.size() - 1 && this.#bitPos === 8) {
                str = str.padEnd(8, '0');
                break;
            }
            str += this.readBit() ? '1' : '0';
        }

        var charCode = parseInt(str, 2);
        str = String.fromCharCode(charCode);
        return str;
    }

    readInt(bits = 32) {
        let str = '';
        for (let i = 0; i < bits; i++) {
            str += +this.readBit();
        }
        return parseInt(str, 2);
    }

    #byteToPaddedBitsString(num) {
        return (num >>> 0).toString(2).padStart(8, '0');
    }
}

module.exports = BinaryReader;