"use strict";

/**
 * Not suits if throw.
 * @param {*} suit checker string
 * @returns {string} valid suits.
 */
function suitCheck (suit) {
    if (typeof suit !== "string") {
        throw new TypeError("suit required");
    }
    const $suit = suit.toLowerCase();
    const suits = ["spade", "slub", "diamond", "heart"];

    if (suits.includes($suit)) return $suit;
    throw new TypeError(`${suit} not suits!`);
};

/**
 * Not Card Number if throw.
 */
function cardNumberChack (number) {
    let $number;

    if (typeof number === "string") {
        switch (number.toUpperCase()) {
        case "A":
            return 1;
        case "J":
            return 11;
        case "Q":
            return 12;
        case "K":
            return 13;
        default:
            $number = Number(number);
        }
    } else if (typeof number === "number") {
        $number = number;
    } else {
        throw new TypeError("number required");
    }
    if ($number < 0 || $number > 13) {
        throw new RangeError("Card number range is from 0 to 13 only");
    }
    return Math.floor($number);
}

class Card {
    /**
     * @param {string} suit
     * @param {string|number} number
     */
    constructor(suit, number) {
        this.suit = suitCheck(suit);
        this.number = cardNumberChack(number);
        Object.freeze(this);
    }

    static create({suit, number}) {
        return new Card(suit, number);
    }

    // eslint-disable-next-line class-methods-use-this
    get [Symbol.toStringTag]() {
        return "Card";
    }
}

exports.Card = Card;