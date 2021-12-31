module.exports = {
    swap: (arr, i, j) => {
        const tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    },
    isSorted: (arr, lo = 0, hi = arr.length - 1) => {
        return arr.every((v, i, a) => {
            if (i < lo || i > hi || hi - lo === 0) return true;
            return i === lo || a[i - 1] <= v;
        });
    }
};