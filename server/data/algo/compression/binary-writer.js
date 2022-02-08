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
    }

    /**
     * 
     * @param {boolean | number} bit 
     */
    writeBit(bit) {
        this.#strBits += bit ? '1' : '0';
        let buffer = Buffer.alloc(1);
        if (this.#curByte == null || this.#bitPos === 8) {
            this.#bitPos = 0;
            this.#bytePos = this.#curByte == null ? 0 : this.#bytePos + 1;
            this.setBit(buffer, 0, this.#bitPos, +bit);
            this.#curByte = buffer.readUInt8(0);
        }

        buffer = Buffer.from([this.#curByte]);
        this.setBit(buffer, 0, this.#bitPos, +bit);
        this.#curByte = buffer.readUInt8(0);

        fs.writeSync(this.#fd, buffer, 0, 1, this.#bytePos);

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
        const bits = this.#numToPaddedBitsString(int);
        for (let i = 0; i < bits.length; i++) {
            this.writeBit(+bits[i]);
        }
    }

    #charToPaddedBitsString(char) {
        return (char.charCodeAt(0) >>> 0).toString(2).padStart(8, '0');
    }

    #numToPaddedBitsString(num) {
        return (num >>> 0).toString(2).padStart(8, '0');
    }
}

module.exports = BinaryWriter;