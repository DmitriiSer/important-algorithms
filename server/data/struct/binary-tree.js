class TreeNode {

    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }

    toString() {
        let str = '' + this.data;
        if (this.left) str += ' ' + this.left.toString();
        if (this.right) str += ' ' + this.right.toString();
        return str;
    }
}

//      1
//     / \
//    2   \
//   / \   \
//  3   8   5
//         / \
//        6   4

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(5);

root.left.left =new TreeNode(3);
root.left.right =new TreeNode(8);

root.right.left = new TreeNode(6);
root.right.right = new TreeNode(4);

console.log(root.toString());