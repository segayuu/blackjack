"use strict";

class Hand {
    constructor() {
        /** @type {Card[]} */
        this.collection = [];
    }
    /**
     * @param {Card} card
     * @returns {void}
     */
    push(card) {
        this.collection.push(card);
    }
    list() {
        return this.collection;
    }
    clear() {
        this.collection.length = 0;
    }
    [Symbol.iterator]() {
        return this.collection[Symbol.iterator]();
    }
    get total() {
        return this.collection.reduce((prev, { number }) => number <= 10 ? prev + number : prev + 10, 0);
    }
    get isBurst() {
        return this.total > 21;
    }
}

exports.Hand = Hand;