import { NodeType } from "../../App/Node";
import {IGrid, INode, Pathfinder, PathInfo, SearchedNode} from "../Pathfinder";
import {Queue} from "../Queue";


/**
 * number of nodes in the graph
 * adjacency list 
 * stat and end nodes 
 */

// Pathfinding class for breadth-first search (BFS)
export class BFS implements Pathfinder {
    grid: IGrid;
    startNode: INode | undefined;
    endNode: INode | undefined;
    queue: Queue;

    // PathInfo properties
    searchOrder: SearchedNode[];
    shortestPath: number[];
    pathFound: boolean;

    /**
     *  creates an instance of the BFS algorithm. 
     *  The width/height of the board is passed in (structure),
     *  and an empty list of nodes (state).
     */
    constructor(BOARD_HEIGHT: number, BOARD_WIDTH: number) {
        this.grid = {height: BOARD_HEIGHT, width: BOARD_WIDTH, nodes: []};
    }

    public findPath(nodes: INode[]): PathInfo {

        this.init(nodes);
        let prev = this.solve();
        this.shortestPath = this.reconstructPath(this.startNode, this.endNode, prev);

        return {
            searchOrder: this.searchOrder,
            shortestPath: this.shortestPath,
            pathFound: this.pathFound
        };
    }

    /**
     *  Initializes all instance variables
     */
    private init(nodes) {
        this.grid.nodes = nodes.slice();
        this.queue = new Queue();

        for (let i = 0; i < this.grid.nodes.length; i++) {
            let currNode = this.grid.nodes[i];
            if (currNode.nodeType === NodeType.StartNode) {
                this.startNode = currNode;
                this.startNode.distance = 0;
                this.startNode.visited = true;
            } else if (currNode.nodeType === NodeType.EndNode) {
                this.endNode = currNode;
            }
        }

        this.searchOrder = [];
        this.shortestPath = [];
        this.pathFound = false;
    }

    private solve() {
        // enqueue starting node
        this.queue.enqueue(this.startNode);

        // initalize bool array[BOARD_HEIGHT * BOARD_WIDTH] to be false
        let visited = [];
        // initialize parent[BOARD_HEIGHT * BOARD_WIDTH] to be null
        // used to reconstruct path from startNode to endNode 
        let prev = [];

        let n = this.grid.height * this.grid.width;
        for (let i = 0; i < n; i++) {
            visited[i] = false;
            prev[i] = null;
        }
        visited[this.getIndex(this.startNode)] = true;

        while (!this.queue.isEmpty()) {
            let node = this.queue.dequeue();
            let neighbors = this.getNeighbors(node);

            for (const neighbor of neighbors) {
                let idx = this.getIndex(neighbor);
                if (!visited[idx]) {
                    this.queue.enqueue(neighbor);
                    visited[idx] = true;
                    prev[idx] = node;
                }
            }
            return prev;
        }
    }

    /**
     *  returns a list of the neighboring nodes of @node
     */
    private getNeighbors(node: INode) {
        return [node]; // stub
    }

    /**
     *  calculate and return the 0-based array index of the node
     */
    private getIndex(node: INode) {
        return node.row * this.grid.width + node.col;
    }

    private reconstructPath(start, end, prevPath) {
        
        /**
         *  path = empty path (array)
         *  for (at = end; at != null; at = prevPath[at])
         *      path.add(at)
         *  
         *  path.reverse()
         * 
         *  if path[0] == start:
         *      return path
         *  return []
         */
        return [1]; // stub
    }

}