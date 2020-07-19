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

class Queue {
    constructor(maxSize = 1000) {
        this._size = 0
        this.maxSize = maxSize
    }

    enqueue(v) {
        this[`${this._size++}`] = v

        if (this._size > this.maxSize) {
            throw new RangeError('the queue is full')
        }

        return this._size
    }

    dequeue() {
        if (this.isEmpty) {
            return;
        }

        const value = this[0]
        for (let i = 1; i < this.size; i++) {
            this[i - 1] = this[i];
        }

        delete this[--this._size]
        return value

    }

    front() {
        if (this.isEmpty) {
            return;
        }

        return this[0]
    }

    get isEmpty() {
        return this.size === 0
    }

    get size() {
        return this._size
    }

    [Symbol.iterator]() {
        return new QueueIterator(this);
    }
}

const queue = new Queue()

for (let i = 0; i < 15; i++) {
    queue.enqueue(i * Math.ceil(Math.random() * 10))
}

console.log(queue)
queue.enqueue('new')
console.log(queue)
const arr = [...queue]
console.log(arr)
console.log(queue.dequeue())
console.log(queue.dequeue())
console.log(queue)
console.log(queue.isEmpty)
console.log(queue.front())
console.log(queue.size)


class PriorityQueueItem {

    constructor(value, priority) {
        this.value = value;
        this.priority = priority;
    }

    get value() {
        return this._value
    }

    set value(value) {
        this._value = value;
    }

    get priority() {
        return this._priority;
    }

    set priority(value) {
        if (typeof value !== 'number') {
            throw new TypeError('Property priority must be number type');
        }
        if (value < 0) {
            throw new RangeError('Property priority must be positive integer');
        }
        this._priority = value;
    }
}