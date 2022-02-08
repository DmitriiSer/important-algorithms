const fs = require('fs');

class BinaryWriter {
    #filename;
    /**
     * @type {number}
     */
    #fd;
    #bitPos;
    #bytePos;
    #curByte;
    #strBits;
    #strBitsPointer;

    /**
     * 
     * @param {string | number | null} filenameOrDescriptor 
     */
    constructor(filenameOrDescriptor = null) {
        if (typeof filenameOrDescriptor === 'number') {
            this.#fd = filenameOrDescriptor;
        } else if (typeof filenameOrDescriptor === 'string') {
            this.#filename = filenameOrDescriptor;
            this.#fd = fs.openSync(this.#filename, 'r');
        }

        this.#bitPos = 0;
        this.#bytePos = 0;
        this.#strBits = '';
        this.#strBitsPointer = 0;
    }

    close() {
        if (this.#fd) {
            try {
                fs.closeSync(this.#fd);
            } catch (e) { }
        }
    }

    getBitsAsBinaryString(sinceLastRequest = false) {
        if (sinceLastRequest) {
            const pos = this.#strBitsPointer;
            this.#strBitsPointer = this.#strBits.length;
            return this.#strBits.substring(pos);
        }
        return this.#strBits;
    }

    getBuffer() {
        const bufSize = Math.ceil(this.#strBits.length / 8);
        const buffer = Buffer.alloc(bufSize);
        for (let i = 0; i < bufSize; i++) {
            const binaryByteStr = this.#strBits.substring(8 * i, 8 * i + 8).padEnd(8, '0');
            const num = +parseInt(binaryByteStr, 2).toString(10);
            buffer.writeUInt8(num, i);
        }
        return buffer;
    }

    /**
     * 
     * @param {boolean | number} bit 
     */
    writeBit(bit) {
        this.#strBits += bit ? '1' : '0';
        let buffer;
        if (this.#curByte == null || this.#bitPos === 8) {
            this.#bitPos = 0;
            this.#bytePos = this.#curByte == null ? 0 : this.#bytePos + 1;
            buffer = Buffer.alloc(1);
            this.setBit(buffer, 0, this.#bitPos, +bit);
            this.#curByte = buffer.readUInt8(0);
        }

        buffer = Buffer.from([this.#curByte]);
        this.setBit(buffer, 0, this.#bitPos, +bit);
        this.#curByte = buffer.readUInt8(0);

        if (this.#fd) {
            fs.writeSync(this.#fd, buffer, 0, 1, this.#bytePos);
        }

        this.#bitPos++;
    }

    setBit(buffer, i, bit, value) {
        if (value == 0) {
            buffer[i] &= ~(1 << bit);
        } else {
            buffer[i] |= (1 << bit);
        }
    }

    /**
     * 
     * @param {string} char 
     */
    writeChar(char) {
        const bits = this.#charToPaddedBitsString(char);
        for (let i = 0; i < bits.length; i++) {
            this.writeBit(+bits[i]);
        }
    }

    writeInt(int) {
        const bits = this.#numToPaddedBitsString(int, 32);
        for (let i = 0; i < bits.length; i++) {
            this.writeBit(+bits[i]);
        }
    }

    #charToPaddedBitsString(char) {
        return (char.charCodeAt(0) >>> 0).toString(2).padStart(8, '0');
    }

    #numToPaddedBitsString(num, pad = 8) {
        return (num >>> 0).toString(2).padStart(pad, '0');
    }
}

module.exports = BinaryWriter;