module.exports = {
    swap: (arr, i, j) => {
        const tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    }
};