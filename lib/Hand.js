"use strict";

class Hand {
    constructor() {
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
        return this.collection.slice();
    }
    clear() {
        this.collection.length = 0;
    }
    [Symbol.iterator]() {
        return this.collection[Symbol.iterator]();
    }
    // eslint-disable-next-line class-methods-use-this
    get isBurst() {
        throw new Error("Not implemented Error.");
    }
}

exports.Hand = Hand;