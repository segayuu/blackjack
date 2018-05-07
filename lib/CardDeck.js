"use strict";
const { Card } = require("./Card");
const cardList = require("./fullCardList.json");

const cardsLength = cardList.length;
/** @type {Card[]|null} */
let cardsArray = null;

/**
 * @returns {void}
 */
function initCardsArray() {
    cardsArray = [];
    let i = -1;

    while (++i < cardsLength) {
        cardsArray[i] = Card.create(cardList[i]);
    }
}

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
    constructor() {
        /** @type {Card[]} */
        this.collection = [];
        this.reset();
    }
    reset() {
        if (cardsArray === null) {
            initCardsArray();
        }
        let i = -1;

        while (++i < cardsLength) {
            this.collection[i] = cardsArray[i];
        }
        shuffle(this.collection);
    }
    /**
     * We will get a card from this object. The card to be retrieved is deleted from this object.
     * @returns {Card|undefined} Card
     */
    pull() {
        return this.collection.pop();
    }
    get count() {
        return this.collection.length;
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
        return this.collection.slice();
    }
    /**
     * Returns an `this.collection[@@iterator]()`.
     * @returns {{ done: true, value: undefined }|{ done: false, value: Card }} iterator object from collection
     */
    values() {
        return this.collection[Symbol.iterator]();
    }
}

exports.CardDeck = CardDeck;