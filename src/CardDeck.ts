"use strict";

import Card from "./Card";
import cardList from "./fullCardList";

Object.freeze(cardList);

const cardsLength = cardList.length;

/**
 * Returns a pseudorandom integer between min and max.
 * @param min integer
 * @param max integer
 * @returns integer
 */
function getRandomInt(min: number, max: number) {
    const $min = Math.ceil(min);
    const $max = Math.floor(max);

    return Math.floor(Math.random() * ($max - $min)) + $min;
}

/**
 * array shuffle, using a version of the Fisher-Yates shuffle.
 * This function mutates array.
 * @param array mutates array.
 */
function shuffle<T> (array: T[]) {
    let i = array.length;

    while (i--) {
        const random = getRandomInt(0, i + 1);
        const temp = array[i];
        array[i] = array[random];
        array[random] = temp;
    }
}

export class CardDeck implements IterableIterator<Card> {
    static get allCards() {
        const array = Object.freeze(cardList.map(card => Card.create(card as {suit: "spade" | "slub" | "diamond" | "heart" | "joker", number: number})));

        Object.defineProperty(CardDeck, "allCards", { value: array });
        return array;
    }
    __collection = CardDeck.allCards.slice();
    __count = cardsLength;
    constructor() {
        this.reset();
    }
    reset() {
        shuffle(this.__collection);
    }
    /**
     * We will get a card from this object. The card to be retrieved is deleted from this object.
     * @returns Card
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
     */
    next() {
        const done = this.count < 1;

        /** @see https://github.com/Microsoft/TypeScript/issues/11375 */
        const value = this.pull()!;

        return { value, done };
    }
    /**
     * Returns an array copying the card data held by this object.
     * @returns copied array
     */
    toArray() {
        return this.__collection.slice(0, this.count);
    }
    /**
     * Returns an `this.toArray()[@@iterator]()`.
     * @returns iterator object from copied array
     */
    values() {
        return this.toArray()[Symbol.iterator]();
    }
}

export default CardDeck;
