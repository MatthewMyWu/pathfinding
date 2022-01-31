// Utility "Heap" implementation
export class Heap {
    heap;

    // Constructs heap that uses getVal(node) to compare heap values
    constructor(getVal) {
        this.heap = [];
        this.getVal = getVal;
    }

    // Inserts the value into the heap
    insert(node) {
        let index = this.heap.length;
        this.heap.push(node);
        while (index > 0) {
            const parent = this.#parent(index);
            if (this.getVal(node) < this.getVal(this.heap[parent])) {
                this.#swap(parent, index);
                index = parent;
            } else {
                break;
            }
        }
    }

    // Returns and removes the min element of heap
    pop() {
        const heap = this.heap, ret = heap[0];
        heap[0] = heap[heap.length - 1];
        heap.length--;
        if (heap.length > 1) this.#heapify(0);
        return ret;
    }

    // Returns size of heap
    length() {
        return this.heap.length;
    }

    // Heapifies the heap starting at the given index
    #heapify(index) {
        const heap = this.heap, left = this.#leftChild(index), right = this.#rightChild(index);
            const val = this.getVal(heap[index]),
            leftVal = left < heap.length ? this.getVal(heap[left]) : Infinity,
            rightVal = right < heap.length ? this.getVal(heap[right]) : Infinity,
            minVal = Math.min(val, leftVal, rightVal);

        if (val === leftVal === rightVal) return;

        if (minVal === leftVal) {
            this.#swap(index, left);
            this.#heapify(left);
        } else if (minVal === rightVal) {
            this.#swap(index, right);
            this.#heapify(right);
        }
    }

    // Swaps elements at indices a and b
    #swap(a, b) {
        const temp = this.heap[a];
        this.heap[a] = this.heap[b];
        this.heap[b] = temp;
    }

    // Returns parent index of given index
    #parent(index) {
        return Math.floor((index - 1) / 2);
    }

    // Returns left child index of given index
    #leftChild(index) {
        return index * 2 + 1;
    }

    // Returns right child index of given index
    #rightChild(index) {
        return index * 2 + 2;
    }

    // Logs current heap (for testing)
    log() {
        for (const i of this.heap) {
            console.log(i + ", ");
        }
    }
}