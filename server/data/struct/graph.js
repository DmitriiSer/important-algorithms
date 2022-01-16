/**
 * Graph representation using adjacency-list (vertix array of adjacent vertices)
 * @class
 * @constructor
 * @public
 */
class Graph {
    /**
     * Number of vertices.
     * @type {number}
     */
    #v;

    /**
     * Adjacency list.
     * @type {number[][]}
     */
    #adj;

    constructor(v) {
        this.#v = v;
        this.#adj = [];
        for (let i = 0; i < this.#v; i++)
            this.#adj.push([]);
    }

    /**
     * Add edge v-w.
     * @param {number} v 
     * @param {number} w 
     */
    addEdge(v, w) {
        this.#adj[v].push(w);
        this.#adj[w].push(v);
    }

    /**
     * Get number of graph vertces.
     * @returns {number}
     */
    getVerticesCount() {
        return this.#v;
    }

    /**
     * 
     * @param {number} v - vertix number
     * @returns 
     */
    adj(v) {
        return this.#adj[v];
    }

    toString() {
        let str = '';
        for (let v = 0; v < this.getVerticesCount(); v++) {
            let adjVerticesStr = '';
            for (let a of this.adj(v)) {
                adjVerticesStr += a + ' ';
            }
            str += `${v} -> ${adjVerticesStr}\n`;
        }
        return str;
    }
}

// 6 vertices, 8 edges:
//     1
//    / \
//   0   2
//   |\ /|
//   3-4-5

const graph = new Graph(6);
graph.addEdge(0, 1);
graph.addEdge(0, 3);
graph.addEdge(0, 4);
graph.addEdge(1, 2);
graph.addEdge(2, 4);
graph.addEdge(2, 5);
graph.addEdge(3, 4);
graph.addEdge(4, 5);

console.log(graph.toString());