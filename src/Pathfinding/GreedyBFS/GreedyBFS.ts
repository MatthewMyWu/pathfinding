import { NodeType } from "../../App/Node";
import {IGrid, INode, Pathfinder, PathInfo, SearchedNode} from "../Pathfinder";
import { PriorityQueue } from "../PriorityQueue";


// implementation of a greedy best-first search algorithm
export class GreedyBFS implements Pathfinder {
    grid: IGrid;
    startNode: INode | undefined;
    endNode: INode | undefined;
    prioQueue: PriorityQueue<INode>;

    searchOrder: SearchedNode[];
    shortestPath: number[];
    pathFound: boolean;
    

    constructor(height: number, width: number, nodes: INode[]) {

        this.grid = {
            height, width, nodes
        }

        this.initStartEndNodes();

        this.prioQueue = new PriorityQueue((node: INode) => {
            this.getDistance(node)
        });

        this.searchOrder = [];
        this.shortestPath = [];
        this.pathFound = false;
    }

    private initStartEndNodes() {

        for (const node of this.grid.nodes) {
            if (node.nodeType === NodeType.StartNode) {
                this.startNode = node;
                node.distance = 0;
            } else if (node.nodeType === NodeType.EndNode) {
                this.endNode = node;
            }
            if (this.startNode !== undefined && this.endNode !== undefined) break;
        }
    }


    public findPath(): PathInfo {
        throw new Error("Method not implemented.");
    }

    /**
     * get the distance between @node and the endNode
     * used as heuristic function for greedy BFS algorithm
     * (linear x distance + linear y distance)
     */
    private getDistance(node: INode) {
        let yDist: number = (this.endNode as INode).row - node.row;
        let xDist: number = (this.endNode as INode).col - node.col;

        return yDist + xDist;
    }
}