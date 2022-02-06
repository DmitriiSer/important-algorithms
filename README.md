# important-algorithms
You want to become a really good programmer? You have to know algorithms and data structures.

> Bad programmers worry about the code. Good programmers worry about data structures and their relationships.
>
> ― Linus Torvalds

## Data Structures

- Linked List
- Union-Find (Disjoint-Set)
- Binary Heap
    - Max-oriented Heap
    - Min-oriented Heap
- Stack
    - Linked list implementation
    - Resizable array implementation
- Queue
    - Dequeue
    - Randomized Queue
    - Priority Queue
        - Unordered Array Implementation
        - Ordered Array Implementation
        - Binary Heap Implementation
- Symbol Tables
    - Red-black Binary Search Tree
    - Hash Table
    - Tries
        - R-way Tries
        - Ternary Search Tries (TST)
- Trees
    - Binary Search Tree (BST)
    - 2-3 Trees
    - Left-leaning Red-Black Tree (LLRB)
    - B-trees
    - 2D Tree
    - Kd-Trees
- Graphs
    - Undirected graphs
    - Directed graphs (digraphs)

## Algorithms

### K-pointer algorithms

### Search algorithms

- Binary Search
- Tree Traversal
    - Depth-first Search (DFS)
        - In-Order
        - Preorder
        - Postorder
    - Breadth-first Search (BFS) / Level-Order

### Sort algorithms

- Selection Sort
- Insertion Sort
- Shell Sort
- Linear Shuffle
- Merge Sort
    - Recursive implementation
    - Improved implementation with insertion sort
    - Bottom-up implementation with no recursion
- Quick Sort
- Heap Sort
- String Sorts
    - Key-indexed Counting
    - Least-significant-digit-first (LSD) String Sort
    - Most-significant-digit-first (MSD) String Sort

#### Time complexity of sort algorithms

|                       | in-place | stable | worst      | average    | best       | comments                                             |
|-----------------------|----------|--------|------------|------------|------------|------------------------------------------------------|
| selection             | *        |        | N^2 / 2    | N^2 / 2    | N^2 / 2    | N exchanges                                          |
| insertion             | *        | *      | N^2 / 2    | N^2 / 4    | N          | use for small N or partially ordered                 |
| shell                 | *        |        | ?          | ?          | N          | tight code, subquadratic                             |
| quick                 | *        |        | N^2 / 2    | 2 N ln N   | N lg N     | N log N probabilistic guarantee, fastest in practice |
| 3-way quick           | *        |        | N^2 / 2    | 2 N ln N   | N          | improves quicksort in presence of duplicate keys     |
| merge                 |          | *      | N lg N     | N lg N     | N lg N     | N log N guarantee, stable                            |
| heap                  | *        |        | 2 N lg N   | 2 N lg N   | N lg N     | N log N guarantee, in-place                          |
| LSD                   |          | *      | 2 WN       | 2 WN       | 2 WN       | fixed-length W keys                                  |
| MSD                   |          | *      | 2 WN       | 2 WN       | N logR N   | average length W keys, random - N logR N             |
| 3-way radix quicksort |          | *      | 2 WN log N | 2 WN log N | 2 N log N  | average length W keys, random - 2 N log N            |

### Other

- Union-find (Disjoint-set) algorithm
- Graph
    - Depth-First Search (DFS) / Reachability
    - Breadth-First Search (BFS) / Shortest paths
    - Connected Components in Undirected Graphs
    - Topological Sort in Directed Acyclic Graphs (DAG)
    - Strongly Connected Components / Kosaraju-Sharir algorithm
    - Minimum Spanning Tree (MST) of an Undirected Graph
        - Kruskal algorithm
        - Prim algorithm
    - Shortest Paths in Digraphs
        - Topological Sort (no directed cycles / DAG)
        - Dijkstra algorithm (no negative weights)
        - Bellman-Ford algorithm (no negative cycles)
        - Find Negative Cycle
    - Maximum Flow / Minimum Cut / Ford-Fulkerson algorithm
- Substring Search
    - Knuth-Morris-Pratt algorithm based on Deterministic Finite Automatons (DFA)
    - Boyer-Moore algorithm
    - Rabin-Karp algorithm
- Regular Expressions
    - Nondeterministic Finite Automaton (NFA) construction and simulation