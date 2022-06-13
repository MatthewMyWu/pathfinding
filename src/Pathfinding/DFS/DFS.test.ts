import {DFS} from "./DFS";
import { IGrid, Pathfinder, PathInfo } from '../Pathfinder';
import { NodeType} from '../../App/Node';
import {Util} from '../util.test';

test('Ignore forest nodes', () => {

    let testGrid: IGrid = Util.createGrid(4, 7);
    testGrid.nodes[16].nodeType = NodeType.StartNode;
    let path = [16, 9, 2, 3, 4, 5, 6, 13, 20];
    for (const n of path) {
        testGrid.nodes[n].nodeType = NodeType.ForestNode;
    }
    testGrid.nodes[20].nodeType = NodeType.EndNode;

    let algorithm: Pathfinder = new DFS(testGrid.height, testGrid.width, testGrid.nodes);
    const result: PathInfo = algorithm.findPath();
    expect(result.pathFound).toEqual(true);
    expect(result.searchOrder.map(node => node.index)).toEqual(path);
    expect(result.searchOrder.map(node => node.distance)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    expect(result.shortestPath).toEqual(path);
});

test("DFS2", () => {
    let testGrid: IGrid = Util.createGrid(4, 7);
    testGrid.nodes[16].nodeType = NodeType.StartNode;
    Util.setWallList(testGrid, [4, 11, 18, 19]);
    testGrid.nodes[20].nodeType = NodeType.EndNode;

    let algorithm: Pathfinder = new DFS(testGrid.height, testGrid.width, testGrid.nodes);
    const result: PathInfo = algorithm.findPath();
    expect(result.pathFound).toEqual(true);
    expect(result.searchOrder.map(node => node.index)).toEqual([16, 9, 2, 3, 10, 17, 24, 25, 26, 27, 20]);
    expect(result.searchOrder.map(node => node.distance)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(result.shortestPath).toEqual([16, 9, 2, 3, 10, 17, 24, 25, 26, 27, 20]);
});

test("DFS3", () => {
    let testGrid: IGrid = Util.createGrid(4, 7);
    testGrid.nodes[16].nodeType = NodeType.StartNode;
    Util.setWallList(testGrid, [4, 11, 18, 25]);
    testGrid.nodes[20].nodeType = NodeType.EndNode;

    let algorithm: Pathfinder = new DFS(testGrid.height, testGrid.width, testGrid.nodes);
    const result: PathInfo = algorithm.findPath();
    expect(result.pathFound).toEqual(false);
    expect(result.searchOrder.map(node => node.index)).toEqual([16, 9, 2, 3, 10, 17, 24, 23, 22, 15, 8, 1, 0, 7, 14, 21]);
    expect(result.searchOrder.map(node => node.distance)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
    expect(result.shortestPath).toEqual([]);
});