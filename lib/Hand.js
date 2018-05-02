"use strict";

class Hand {
    constructor() {
        /** @type {Card[]} */
        this._collection = [];
    }
    /**
     * @param {Card} card
     * @returns {void}
     */
    push(card) {
        this._collection.push(card);
    }
    list() {
        return this._collection;
    }
    clear() {
        this._collection.length = 0;
    }
    [Symbol.iterator]() {
        return this._collection[Symbol.iterator]();
    }
}

exports.Hand = Hand;