// Interfaces for pathfinder algorithms

import {Djikstra} from "./Djikstra/Djikstra";
import {AStar} from "./AStar/AStar";
import {BFS} from "./BFS/BFS";
import {DFS} from "./DFS/DFS"
import { NodeType } from "../App/Node";
import { GreedyBFS } from "./GreedyBFS/GreedyBFS";

// Enumeration of all the available algorithms
export const enum Algorithm {
    Djikstra = "Djikstra's", AStar = "A*", BFS = "BFS", DFS = "DFS", GreedyBFS = "GBFS"
}

export interface IGrid {
    height: number,
    width: number,
    nodes: INode[]
}

export interface INode {
    weight: number,
    row: number,
    col: number,
    distance: number,
    nodeType: NodeType,
    visited: boolean,
    prev: INode
}

export interface PathInfo {
    searchOrder: SearchedNode[], // Order in which nodes were searched
    shortestPath: number[], // Order of INDICES of nodes in shortest path
    pathFound: boolean, // False if no path was found
}

// Encapsulates a node visited by the pathfinder
export interface SearchedNode {
    index: number, // index on the grid
    distance: number, // updated distance
}

export abstract class Pathfinder {

    public static createPathfinder(algorithm: Algorithm, BOARD_HEIGHT: number, BOARD_WIDTH: number, nodes: INode[]): Pathfinder {
        switch(algorithm) {
            case Algorithm.Djikstra:
                return new Djikstra(BOARD_HEIGHT, BOARD_WIDTH, nodes);
            case Algorithm.BFS:
                return new BFS(BOARD_HEIGHT, BOARD_WIDTH, nodes);
            case Algorithm.AStar:
                return new AStar(BOARD_HEIGHT, BOARD_WIDTH, nodes);
            case Algorithm.DFS:
                return new DFS(BOARD_HEIGHT, BOARD_WIDTH, nodes);
            case Algorithm.GreedyBFS:
                return new GreedyBFS(BOARD_HEIGHT, BOARD_WIDTH, nodes);
            default:
                return new Djikstra(BOARD_HEIGHT, BOARD_WIDTH, nodes);
        }
    }


    // Find shortest path from start node to end node
    // Assumes all nodes start with infinite distance and are unvisited
    // Note that this WILL MODIFY visited states of board
    public abstract findPath(): PathInfo;
}

