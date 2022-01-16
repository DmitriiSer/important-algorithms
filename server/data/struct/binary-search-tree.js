class TreeNode {

    #data;
    #left;
    #right;

    constructor(data) {
        this.#data = data;
        this.#left = null;
        this.#right = null;
    }

    addNode(data) {
        if (data < this.#data) {
            if (this.#left) this.#left.addNode(data);
            else this.#left = new TreeNode(data);
        } else if (data > this.#data) {
            if (this.#right) this.#right.addNode(data);
            else this.#right = new TreeNode(data);
        }
        else throw new Error('BST cannot support duplicate values!');
    }

    // generates inorder traversal
    inorderTraversal() {
        let str = '';
        if (this.#left) str += this.#left.inorderTraversal();
        str += (str !== '' ? ' ' : '') + this.#data;
        if (this.#right) str += ' ' + this.#right.inorderTraversal();
        return str;
    }

    // generates preorder traversal
    preorderTraversal() {
        let str = '' + this.#data;
        if (this.#left) str += ' ' + this.#left.preorderTraversal();
        if (this.#right) str += ' ' + this.#right.preorderTraversal();
        return str;
    }

    // generates postorder traversal
    postorderTraversal() {
        let str = '';
        if (this.#left) str += this.#left.postorderTraversal();
        if (this.#right) str += (str !== '' ? ' ' : '') + this.#right.postorderTraversal();
        str += (str !== '' ? ' ' : '') + this.#data;
        return str;
    }
}

// [1,2,5,3,8,6,4]
//      1
//       \
//        2
//         \
//          5
//         / \
//        3   \
//         \   \
//          4   8
//             /
//            6

const root = new TreeNode(1);
root.addNode(2);
root.addNode(5);
root.addNode(3);
root.addNode(8);
root.addNode(6);
root.addNode(4);

console.log('Pre order - ' + root.preorderTraversal());
console.log('In order - ' + root.inorderTraversal() + ' - always produces sorted output');
console.log('Post order - ' + root.postorderTraversal());