import React, { Component } from 'react';
import Node from "./Node.js";

const BOARD_HEIGHT = 8;
const BOARD_WIDTH = 8;

const INIT_START_ROW = 1;
const INIT_START_COL = 0;
const INIT_END_ROW = 2;
const INIT_END_COL = 4;


// These enums used for node type
export const EmptyNode = Symbol(0), StartNode = Symbol(1), EndNode = Symbol(2), WallNode = Symbol(3);

// These enums used for moving/placing start, end, and walls
const HoldNone = Symbol(0);
const HoldStart = Symbol(1);
const HoldEnd = Symbol(2);
const HoldWall = Symbol(3);

export default class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            mouseDown: false,
            holdType: HoldNone
        }
    }

    componentDidMount() {
        this.setState({ grid: createInitGrid() });
    }

    handleMouseDown(row, col) {
        const newState = { mouseDown: true };
        const nodeType = getNode(this.state.grid, row, col).nodeType;
        switch (nodeType) {
            case StartNode:
                newState.holdType = HoldStart;
                break;
            case EndNode:
                newState.holdType = HoldEnd;
                break;
            case EmptyNode:
            case WallNode:
                newState.holdType = HoldWall;
                modifyGridWall(this.state.grid, row, col);
                newState.grid = this.state.grid;
        }
        this.setState(newState);
    }

    handleMouseEnter(row, col) {
        if (!this.state.mouseDown) return;

        const grid = this.state.grid;
        const holdType = this.state.holdType;
        const nodeType = getNode(grid, row, col).nodeType;
        if (holdType === HoldStart && nodeType === EmptyNode) {
            modifyGridStart(grid, row, col);
        } else if (holdType === HoldEnd && nodeType === EmptyNode) {
            modifyGridEnd(grid, row, col);
        } else if (holdType === HoldWall && (nodeType === EmptyNode || nodeType === WallNode)) {
            modifyGridWall(grid, row, col);
        }
        this.setState({ grid: grid });
    }

    handleMouseUp() {
        const newState = { mouseDown: false, holdType: HoldNone };
        this.setState(newState);
    }

    renderNode(node) {
        const index = node.row * BOARD_WIDTH + node.col;
        return <Node key={index} row={node.row} col={node.col} nodeType={node.nodeType} wallClasses={node.wallClasses}
            onMouseDown={(row, col) => this.handleMouseDown(row, col)}
            onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
            onMouseUp={() => this.handleMouseUp()} />
    }

    renderBoard() {
        const grid = [];
        for (const node of this.state.grid) {
            grid.push(this.renderNode(node));
        }
        return <div className="board" onMouseLeave={() => this.handleMouseUp()}>{grid}</div>
    }

    render() {
        return this.renderBoard();
    }
}






function createInitGrid() {
    const grid = [];
    for (let row = 0; row < BOARD_HEIGHT; row++) {
        for (let col = 0; col < BOARD_WIDTH; col++) {
            grid.push(createNode(row, col));
        }
    }
    return grid;

    function createNode(row, col) {
        const nodeType = (row == INIT_START_ROW && col == INIT_START_COL) ? StartNode : (row == INIT_END_ROW && col == INIT_END_COL) ? EndNode : EmptyNode;
        return {
            row: row,
            col: col,
            nodeType: nodeType,
            wallClasses: "",
        }
    }
}


// Given a grid, makes the start node at the specified row and col
// Ensures that all surrounding nodes are not starting nodes
function modifyGridStart(grid, row, col) {
    for (const node of grid) {
        if (node.nodeType === StartNode) { node.nodeType = EmptyNode; break; }
    }
    getNode(grid, row, col).nodeType = StartNode;
}

function modifyGridEnd(grid, row, col) {
    for (const node of grid) {
        if (node.nodeType === EndNode) { node.nodeType = EmptyNode; break; }
    }
    getNode(grid, row, col).nodeType = EndNode;
}

function modifyGridWall(grid, row, col) {
    const node = getNode(grid, row, col);
    switch (node.nodeType) {
        case EmptyNode:
            node.nodeType = WallNode;
            break;
        case WallNode:
            node.nodeType = EmptyNode;
            break;
    }

    // Modifying surrounding wall classes
    for (let x = row - 1; x <= row + 1; x++) {
        for (let y = col - 1; y <= col + 1; y++) {
            try {
                getNode(grid, x, y).wallClasses = getwallClasses(grid, x, y);
            } catch(e) {
                // Out of bounds exception. Do nothing
            }
        }
    }

}

// Assuming the node at the specified row and col is a wall, will return its corresponding "wall class"
// Used for css purposes
function getwallClasses(grid, row, col) {
    let ret = "";
    for (let x = row - 1; x <= row + 1; x++) {
        for (let y = col - 1; y <= col + 1; y++) {
            if (x === row && y === col) {continue;}
            let node = undefined;
            try {
                node = getNode(grid, x, y);
            } catch(e) {
                // Out of bounds exception. Do nothing
            }
            ret += (node && node.nodeType === WallNode) ? `wall-class-${3*(x-row+1) + (y-col+1)} `: "";
        }
    }
    return ret;
}


function getNode(grid, row, col) {
    return grid[row * BOARD_WIDTH + col];
}