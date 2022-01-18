class Digraph {

    #v;
    #adj;

    /**
     * @param {*} v 
     */
    constructor(v) {
        this.#v = v;
        this.#adj = [];
        for (let i = 0; i < this.#v; i++)
            this.#adj.push([]);
    }

    /**
     * Get number of graph vertices.
     * @returns {number}
     */
    getVertexCount() {
        return this.#v;
    }

    /**
     * Get number of graph edges.
     * @returns {number}
     */
    getEdgeCount() {
        let count = 0;
        for (let v = 0; v < this.#v; v++) {
            for (let w of this.#adj) {
                count++;
            }
        }
        return count;
    }

    /**
     * Add a directed edge v-w.
     * @param {*} v 
     * @param {*} w 
     */
    addEdge(v, w) {
        this.#adj[v].push(w);
    }

    /**
     * Get adjacent vertices.
     * @param {number} v - vertix number
     * @returns 
     */
    adj(v) {
        return this.#adj[v];
    }

    /**
     * Reverse edges.
     */
    reverse() {
        return null;
    }

    toString() {
        let str = '';
        for (let v = 0; v < this.getVertexCount(); v++) {
            let adjVerticesStr = [];
            for (let a of this.adj(v)) {
                adjVerticesStr.push(a);
            }
            str += `${v} -> ${adjVerticesStr.length > 0 ? adjVerticesStr.join(' ') : 'null'}\n`;
        }
        return str;
    }
}

module.exports = Digraph;

// 6 vertices, 9 edges:
//   0 ←-- 2
//   |↘   ↓↑ ↖
//   | 1   3  |
//   |   ↙ ↑ /
//   ↓ ↙   |/
//   5 --→ 4

const graph = new Digraph(6);
graph.addEdge(0, 1);
graph.addEdge(0, 5);
graph.addEdge(2, 0);
graph.addEdge(2, 3);
graph.addEdge(3, 2);
graph.addEdge(3, 5);
graph.addEdge(4, 2);
graph.addEdge(4, 3);
graph.addEdge(5, 4);

console.log(graph.toString());