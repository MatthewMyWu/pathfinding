import { Heap } from "../Heap";
import { NodeType } from "../../App/Node";
import {IGrid, Pathfinder, PathInfo, SearchedNode} from "../Pathfinder";

// Pathfinding class for Djikstra's algorithm
export class Djikstra implements Pathfinder {
    BOARD_HEIGHT: number;
    BOARD_WIDTH: number;
    searchOrder: SearchedNode[] = [];
    shortestPath: any;
    pathFound: any;
    heap: any;
    grid: any;
    startNode: any;
    endNode: any;

    constructor(BOARD_HEIGHT: number, BOARD_WIDTH: number) {
        this.BOARD_HEIGHT = BOARD_HEIGHT;
        this.BOARD_WIDTH = BOARD_WIDTH;
    }
    
    
    public findPath(grid: any[]):PathInfo {
        this.init(grid);
        this.addNeighbors(this.startNode);
        this.search();
        this.calcShortestPath();
        return {
            searchOrder: this.searchOrder, // Order in which nodes were searched
            shortestPath: this.shortestPath, // Order of nodes in shortest path
            pathFound: this.pathFound, // False if no path was found
        }
    }

    // Recursive search to find shortest path.
    private search() {
        if (this.pathFound) return;

        // updating "Next"
        let next = undefined;
        while ((next === undefined || next.visited) && this.heap.length() > 0) {
            next = this.heap.pop();
        } 
        // Searching "next"
        next.visited = true;
        this.addToSearchOrder(next);
        this.addNeighbors(next);
        // Case where no valid path is found
        if (this.heap.length() === 0) {
            this.pathFound = false;
            return;
        }
        this.search();
    }

    // Initializes class variables
    private init(grid: any[]) {
        this.grid = grid.slice();
        this.searchOrder = [];
        this.shortestPath = [];
        this.startNode = undefined;
        this.endNode = undefined;
        this.heap = new Heap((node: any) => { return node.distance });
        // Initialize start and end indices
        for (let i = 0; i < this.grid.length; i++) {
            if (grid[i].nodeType === NodeType.StartNode) {
                this.startNode = grid[i];
                grid[i].distance = 0;
                grid[i].visited = true;
            } else if (grid[i].nodeType === NodeType.EndNode) {
                this.endNode = grid[i];
            }
            if (this.startNode !== undefined && this.endNode !== undefined) break;
        }
    }

    // Adds node's (non-wall, unvisited) neighbors to the heap
    private addNeighbors(node: any) {
        const BOARD_HEIGHT = this.BOARD_HEIGHT, BOARD_WIDTH = this.BOARD_WIDTH,
            index = this.getIndex(node),
            top = (index - BOARD_WIDTH >= 0) ? index - BOARD_WIDTH : undefined,
            bottom = (index + BOARD_WIDTH < BOARD_WIDTH * BOARD_HEIGHT) ? index + BOARD_WIDTH : undefined,
            left = (Math.floor((index - 1) / BOARD_WIDTH) === Math.floor((index) / BOARD_WIDTH)) ? index - 1 : undefined,
            right = (Math.floor((index + 1) / BOARD_WIDTH) === Math.floor((index) / BOARD_WIDTH)) ? index + 1 : undefined,
            neighbors = [top, right, bottom, left];
        for (const i of neighbors) {
            if (i !== undefined && this.grid[i].nodeType !== NodeType.WallNode && !(this.grid[i].visited)) {
                const nextNode = this.grid[i];
                if (node.distance + nextNode.weight < nextNode.distance) {
                    nextNode.distance = node.distance + nextNode.weight;
                    nextNode.prev = node;
                    this.heap.insert(nextNode);
                    if (nextNode.nodeType === NodeType.EndNode) this.pathFound = true;
                }
            }
        }

    }

    // Adds the node to the search order
    private addToSearchOrder(node: any) {
        this.searchOrder.push(
            {
                index: node.row * this.BOARD_WIDTH + node.col,
                distance: node.distance,
            });
    }

    // Initializes "this.shortestPath"
    private calcShortestPath() {
        let prev = this.endNode.prev;
        const shortestPath = [];
        while (prev !== null) {
            shortestPath.unshift(this.getIndex(prev));
            prev = prev.prev;
        }
        this.shortestPath = shortestPath;
    }

    // Returns the (array) index for a node
    private getIndex(node: any) {
        return node.row*this.BOARD_WIDTH + node.col;
    }
}