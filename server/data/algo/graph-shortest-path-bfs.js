const Graph = require('../struct/graph');
const Queue = require('../struct/linked-list-queue');
const assert = require('assert');

class GraphBFS {

    /**
     * @type {Queue}
     */
    #queue;

    /**
     * @type {Array}
     */
    #marked;

    /**
     * @type {Array}
     */
    #edgeTo;

    /**
      * @type {Array}
      */
    #distTo;

    constructor(graph, s) {
        this.#queue = new Queue();
        this.#marked = [];
        this.#edgeTo = [];
        this.#distTo = [];
        for (let v = 0; v < graph.getVertexCount(); v++) {
            this.#marked.push(false);
            this.#edgeTo.push('-');
            this.#distTo.push('-');
        }
        this.#bfs(graph, s);
    }

    /**
     * 
     * @param {Graph} graph 
     * @param {number} s 
     */
    #bfs(graph, s) {
        this.#queue.enqueue(s);
        this.#marked[s] = true;
        this.#distTo[s] = 0;

        while (!this.#queue.isEmpty()) {
            const v = this.#queue.dequeue();

            for (let w of graph.adj(v)) {
                if (!this.#marked[w]) {
                    this.#queue.enqueue(w);
                    this.#marked[w] = true;
                    this.#edgeTo[w] = v;
                    this.#distTo[w] = this.#distTo[v] + 1;
                }
            }
        }
    }

    /**
     * 
     * @param {number} v 
     */
    distanceTo(v) {
        return this.#distTo[v];
    }

}

//     1
//    / \   6-7
//   0   2       8-9
//   |\ /|       |/
//   3-4-5       10
const graph = new Graph(11);
graph.addEdge(0, 1);
graph.addEdge(0, 3);
graph.addEdge(0, 4);
graph.addEdge(1, 2);
graph.addEdge(2, 4);
graph.addEdge(2, 5);
graph.addEdge(3, 4);
graph.addEdge(4, 5);
//
graph.addEdge(6, 7);
//
graph.addEdge(8, 9);
graph.addEdge(8, 10);
graph.addEdge(9, 10);

const search1 = new GraphBFS(graph, 0);
assert.equal(search1.distanceTo(0), 0);
assert.equal(search1.distanceTo(1), 1);
assert.equal(search1.distanceTo(2), 2);
assert.equal(search1.distanceTo(3), 1);
assert.equal(search1.distanceTo(4), 1);
assert.equal(search1.distanceTo(5), 2);

const search2 = new GraphBFS(graph, 4);
assert.equal(search2.distanceTo(0), 1);
assert.equal(search2.distanceTo(1), 2);
assert.equal(search2.distanceTo(2), 1);
assert.equal(search2.distanceTo(3), 1);
assert.equal(search2.distanceTo(4), 0);
assert.equal(search2.distanceTo(5), 1);

console.log('All tests passed!');