import { NodeType } from "../../App/Node";
import {IGrid, INode, Pathfinder, PathInfo, SearchedNode} from "../Pathfinder";

export class GreedyBFS implements Pathfinder {
    grid: IGrid;
    startNode: INode | undefined;
    endNode: INode | undefined;
    prioQueue: INode[] = [];

    searchOrder: SearchedNode[];
    shortestPath: number[];
    pathFound: boolean;
    

    constructor(height: number, width: number, nodes: INode[]) {

        this.grid = {
            height, width, nodes
        }

        this.searchOrder = [];
        this.shortestPath = [];
        this.pathFound = false;
    }


    public findPath(): PathInfo {
        throw new Error("Method not implemented.");
    }
}