const assert = require('assert');
const Digraph = require('../struct/digraph');
const GraphDFS = require('./graph-search-dfs');

class GraphTopologicalSort {

    /**
     * 
     * @param {Digraph} graph
     */
    getTopologicalOrder(graph) {
        return new GraphDFS(graph, 0).getReversePostorder();
    }
}

//  0 --------
//  ↑ ↘    ↘  ↘
//  |   2 ← 5   1
//  |    ↖ ↗   ↙
//  |   _ 3 → 4
//  | ↙      ↗
//  6 ------/

const graph = new Digraph(7);
graph.addEdge(0, 1);
graph.addEdge(0, 2);
graph.addEdge(0, 5);
graph.addEdge(1, 4);
graph.addEdge(3, 2);
graph.addEdge(3, 4);
graph.addEdge(3, 5);
graph.addEdge(3, 6);
graph.addEdge(5, 2);
graph.addEdge(6, 0);
graph.addEdge(6, 4);

const sort = new GraphTopologicalSort();
assert.deepEqual(sort.getTopologicalOrder(graph), [4, 1, 2, 5, 0]);