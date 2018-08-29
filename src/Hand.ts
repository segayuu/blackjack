"use strict";
import Card from "./Card";

export class Hand implements Iterable<Card> {
    _collection: Card[] = [];
    push(card: Card) {
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

export default Hand;
