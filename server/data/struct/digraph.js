class Digraph {

    #v;
    #adj;

    /**
     * @param {*} v 
     */
    constructor(v) {
        this.#v = v;
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
        this.#adj[w].push(v);
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
}