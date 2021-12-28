class ListNode {
    /**
     * @param {string} data 
     * @param {ListNode} next 
     */
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

class LinkedList {
    /**
     * @param {ListNode} head 
     */
    constructor(head = null) {
        this.head = head;
    }

    size() {
        let count = 0;
        if (this.head) {
            let node = this.head.next;
            while (node) {
                count++;
                node = node.next;
            }
        }
        return count;
    }

    clear() {
        this.head = null;
    }

    getFirst() {
        return this.head;
    }

    getLast() {
        let last = this.head;
        if (last) {
            while (last.next) {
                last = last.next;
            }
        }
        return last;
    }
}

// create a new linked list with 3 elements
const node1 = new ListNode('A');
const node2 = new ListNode('B');
node1.next = node2;
const node3 = new ListNode('C');
node2.next = node3;
const ll = new LinkedList(node1);

console.log(`list size = ${ll.size()}`);
console.log(`first item:`, ll.getFirst());
console.log(`last item:`, ll.getLast());
ll.clear();
console.log(`list size = ${ll.size()}`);
console.log(`first item:`, ll.getFirst());
console.log(`last item:`, ll.getLast());