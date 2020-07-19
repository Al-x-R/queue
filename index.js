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

    constructor( priority, value) {
        this.priority = priority
        this.value = value
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

class PriorityQueue extends Queue {

    constructor() {
        super()
    }

    enqueue(...args) {
        let item;
        if (args.length === 1) {
            item = args[0]
        } else {
            item = new PriorityQueueItem(args[0], args[1]);
        }
        if (this.isEmpty) {
            this[0] = item
        } else {
            for (let i = this.size - 1; i >= 0; i--) {
                if (item.priority >= this[i].priority) {
                    this[i + 1] = item
                } else {
                    this[i + 1] = this[i]
                }
            }
        }
        return this._size++;
    }
}

const priorityQueue = new PriorityQueue()
priorityQueue.enqueue(10, 4)
priorityQueue.enqueue(5, 10)
priorityQueue.enqueue(5, 3)
priorityQueue.enqueue(5, 5)
priorityQueue.enqueue(5, 7)
priorityQueue.dequeue()
console.log(priorityQueue)