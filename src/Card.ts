"use strict";

const stringTohashCode = (str: string) => {
    let hash = 0;

    for (let i = 0 ; i < str.length; i++) {
        hash = hash * 31 + str.charCodeAt(i) | 0;
    }
    return hash;
};

const cardToNumber = (card: Card) => {
    let result = card.number;

    switch (card.suit) {
    case "spade":
        break;
    case "heart":
        result += 13;
    case "diamond": // eslint-disable-line no-fallthrough
        result += 13;
    case "slub": // eslint-disable-line no-fallthrough
        result += 13;
        break;
    default:
        result = stringTohashCode(`${card.suit}${card.number}`);
        break;
    }
    return result;
};

/**
 * Not Card Number if throw.
 */
function cardNumberChack (number: string | number) {
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
    } else {
        $number = number;
    }
    if ($number < 0 || $number > 13) {
        throw new RangeError("Card number range is from 0 to 13 only");
    }
    return Math.floor($number);
}

type Suit = "spade" | "slub" | "diamond" | "heart" | "joker";

export class Card {
    readonly suit: Suit;
    readonly number: number;

    constructor(suit: Suit, number: string|number) {
        if (suit == null) throw new Error("suit required");
        if (number == null) throw new Error("number required");
        this.suit = suit;
        this.number = cardNumberChack(number);
        Object.freeze(this);
    }

    static create(object: { suit: Suit, number: number }) {
        const { suit, number } = object;
        return new Card(suit, number);
    }

    valueOf() {
        return cardToNumber(this);
    }

    readonly [Symbol.toStringTag] = "Card";
}

export default Card;