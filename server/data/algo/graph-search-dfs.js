const Graph = require('../struct/graph');
const assert = require('assert');

class GraphDFS {

    /**
     * @type {Array}
     */
    #marked;

    /**
     * @type {Array}
     */
    #edgeTo;

    /**
     * 
     * @param {Graph} graph 
     * @param {number} s
     */
    constructor(graph, s) {
        this.#marked = [];
        this.#edgeTo = [];
        for (let v = 0; v < graph.getVertexCount(); v++) {
            this.#marked.push(false);
            this.#edgeTo.push('-');
        }
        this.#dfs(graph, s);
    }

    /**
     * 
     * @param {Graph} graph 
     * @param {number} v 
     */
    #dfs(graph, v) {
        this.#marked[v] = true;
        for (let w of graph.adj(v)) {
            if (!this.#marked[w]) {
                this.#dfs(graph, w);
                this.#edgeTo[w] = v;
            }
        }
    }

    /**
     * 
     * @param {number} v 
     * @returns 
     */
    isVisited(v) {
        return this.#marked[v];
    }

    /**
     * 
     * @param {number} v 
     * @param {number} w 
     */
    connected(v, w) {
        let vertex = v;
        while (this.#edgeTo[vertex] !== '-') {
            if (w === this.#edgeTo[vertex]) return true;
            vertex = this.#edgeTo[vertex];
        }

        vertex = w;
        while (this.#edgeTo[vertex] !== '-') {
            if (v === this.#edgeTo[vertex]) return true;
            vertex = this.#edgeTo[vertex];
        }

        return false;
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

const search1 = new GraphDFS(graph, 0);

assert.ok(search1.isVisited(0));
assert.ok(search1.isVisited(1));
assert.ok(search1.isVisited(2));
assert.ok(search1.isVisited(3));
assert.ok(search1.isVisited(4));
assert.ok(search1.isVisited(5));

assert.ok(!search1.isVisited(6));
assert.ok(!search1.isVisited(7));

assert.ok(!search1.isVisited(8));
assert.ok(!search1.isVisited(9));
assert.ok(!search1.isVisited(10));

const search2 = new GraphDFS(graph, 7);
assert.ok(!search2.isVisited(0));
assert.ok(!search2.isVisited(1));
assert.ok(!search2.isVisited(2));
assert.ok(!search2.isVisited(4));
assert.ok(!search2.isVisited(3));
assert.ok(!search2.isVisited(5));

assert.ok(search2.isVisited(6));
assert.ok(search2.isVisited(7));

assert.ok(!search2.isVisited(8));
assert.ok(!search2.isVisited(9));
assert.ok(!search2.isVisited(10));

const search3 = new GraphDFS(graph, 10);
assert.ok(!search3.isVisited(0));
assert.ok(!search3.isVisited(1));
assert.ok(!search3.isVisited(2));
assert.ok(!search3.isVisited(4));
assert.ok(!search3.isVisited(3));
assert.ok(!search3.isVisited(5));

assert.ok(!search3.isVisited(6));
assert.ok(!search3.isVisited(7));

assert.ok(search3.isVisited(8));
assert.ok(search3.isVisited(9));
assert.ok(search3.isVisited(10));

// check connectivity
assert.ok(search2.connected(7, 6));
assert.ok(!search2.connected(1, 6));
assert.ok(!search2.connected(10, 7));

assert.ok(search3.connected(9, 10));
assert.ok(!search3.connected(7, 8));
assert.ok(!search3.connected(1, 6));

console.log('All tests passed!');