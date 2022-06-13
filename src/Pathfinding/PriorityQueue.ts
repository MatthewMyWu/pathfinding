import {Heap} from "./Heap";

// implementation of the priority queue abstract datatype
export class PriorityQueue<T> {
    contents: Heap<T>;
    
    constructor(heuristic: Function) {
        this.contents = new Heap(heuristic);
    }

    public enqueue(item: T) {
        this.contents.insert(item);
    }

    public dequeue(): T {
        return this.contents.pop();
    }

    public length(): number {
        return this.contents.length();
    }
}