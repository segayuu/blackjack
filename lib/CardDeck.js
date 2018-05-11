"use strict";
const { Card } = require("./Card");
/** @type {{ suit: string, number: number }[]} */
const cardList = Object.freeze(require("./fullCardList.json"));

const cardsLength = cardList.length;

/**
 * Returns a pseudorandom integer between min and max.
 * @param {number} min integer
 * @param {number} max integer
 * @returns {number} integer
 */
function getRandomInt(min, max) {
    const $min = Math.ceil(min);
    const $max = Math.floor(max);

    return Math.floor(Math.random() * ($max - $min)) + $min;
}

/**
 * array shuffle, using a version of the Fisher-Yates shuffle.
 * This function mutates array.
 * @param {any[]} array mutates array.
 * @returns {void}
 */
function shuffle (array) {
    let i = array.length;

    let random, temp;

    while (i--) {
        random = getRandomInt(0, i + 1);
        temp = array[i];
        array[i] = array[random];
        array[random] = temp;
    }
}

class CardDeck {
    static get allCards() {
        const array = Object.freeze(cardList.map(card => Card.create(card)));

        Object.defineProperty(CardDeck, "allCards", { value: array });
        return array;
    }
    constructor() {
        this.__collection = CardDeck.allCards.slice();
        this.__count = cardsLength;
        this.reset();
    }
    reset() {
        shuffle(this.__collection);
    }
    /**
     * We will get a card from this object. The card to be retrieved is deleted from this object.
     * @returns {Card|undefined} Card
     */
    pull() {
        if (this.count > 0) {
            const result = this.__collection[cardsLength - this.count];

            this.__count--;
            return result;
        }
        return void 0;
    }
    get count() {
        return this.__count;
    }
    [Symbol.iterator]() {
        return this;
    }
    /**
     * Returns result of CardDeck#pull() as a wrapper object of iterator protocol.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol
     * @returns {{ done: true, value: undefined }|{ done: false, value: Card }} iteratorResult
     */
    next() {
        const done = this.count < 1;
        const value = this.pull();

        return { value, done };
    }
    /**
     * Returns an array copying the card data held by this object.
     * @returns {Card[]} copied array
     */
    toArray() {
        return this.__collection.slice(0, this.count);
    }
    /**
     * Returns an `this.toArray()[@@iterator]()`.
     * @returns {{ done: true, value: undefined }|{ done: false, value: Card }} iterator object from copied array
     */
    values() {
        return this.toArray()[Symbol.iterator]();
    }
}

exports.CardDeck = CardDeck;