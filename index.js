"use strict";

class QueueIterator {
    constructor(queue) {
        this._queue = queue
        this._start = 0
    }

    next() {
        if (this._start >= this._queue.size) {
            return {
                value: undefined,
                done: true,
            }
        }
        return {
            value: this._queue[this._start],
            done: this._start++ === this._queue.size,
        }
    }
}