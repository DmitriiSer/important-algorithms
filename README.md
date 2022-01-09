# important-algorithms
You want to become a really good programmer? You have to know algorithms and data structures.

> Bad programmers worry about the code. Good programmers worry about data structures and their relationships.
>
> ― Linus Torvalds

## Data Structures

- Linked List
- Union-Find (Disjoint-Set)
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
- Binary Heap
    - Max-oriented Heap
- Symbol Tables
- Trees
    - Binary Search Tree (BST)
    - 2-3 Trees
    - Left-leaning Red-Black Tree (LLRB)
    - B-trees
    - 2D Tree
    - Kd-Trees

## Algorithms

### Search algorithms

- Binary Search
- Tree Traversal
    - DST
        - In-Order
        - Preorder
        - Postorder
    - BST / Level-Order

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


|             | in-place | stable | worst    | average  | best    | comments                                             |
|-------------|----------|--------|----------|----------|---------|------------------------------------------------------|
| selection   | *        |        | N^2 / 2  | N^2 / 2  | N^2 / 2 | N exchanges                                          |
| insertion   | *        | *      | N^2 / 2  | N^2 / 4  | N       | use for small N or partially ordered                 |
| shell       | *        |        | ?        | ?        | N       | tight code, subquadratic                             |
| quick       | *        |        | N^2 / 2  | 2 N ln N | N lg N  | N log N probabilistic guarantee, fastest in practice |
| 3-way quick | *        |        | N^2 / 2  | 2 N ln N | N       | improves quicksort in presence of duplicate keys     |
| merge       |          | *      | N lg N   | N lg N   | N lg N  | N log N guarantee, stable                            |
| heap        | *        |        | 2 N lg N | 2 N lg N | N lg N  | N log N guarantee, in-place                          |

### Other

- Union-find (Disjoint-set) algorithm