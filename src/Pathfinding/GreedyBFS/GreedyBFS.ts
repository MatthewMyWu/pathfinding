import { NodeType } from "../../App/Node";
import {IGrid, INode, Pathfinder, PathInfo, SearchedNode} from "../Pathfinder";

export class GreedyBFS implements Pathfinder {
    
    
    constructor(height: number, width: number, nodes: INode[]) {
                
    }


    public findPath(): PathInfo {
        throw new Error("Method not implemented.");
    }
}