const test = require("ava");
const { CardDeck } = require("../lib/CardDeck");

test("CardDeck#pull()", t => {
    const deck = new CardDeck();
    const { toString } = Object.prototype;
    let card;

    while (typeof (card = deck.pull()) === "object") {
        t.deepEqual(toString.call(card), "[object Card]");
    }
    t.deepEqual(deck.pull(), void 0);
    t.deepEqual(deck.pull(), void 0);
});

test("CardDeck#count", t => {
    const deck = new CardDeck();
    let sum = deck.count;

    while (deck.count) {
        deck.pull();
        t.deepEqual(deck.count, --sum);
    }
    t.deepEqual(deck.count, 0);
});

test("CardDeck#next()", t => {
    const deck = new CardDeck();
    const { toString } = Object.prototype;

    while (deck.count) {
        const { done, value } = deck.next();

        t.false(done);
        t.deepEqual(toString.call(value), "[object Card]");
    }

    const { done, value } = deck.next();

    t.true(done);
    t.deepEqual(value, void 0);
    t.deepEqual(deck.count, 0);
    t.deepEqual(deck.pull(), void 0);
});

test("CardDeck#[@@iterator]()", t => {
    const deck = new CardDeck();
    const { toString } = Object.prototype;

    for (const card of deck) {
        t.deepEqual(toString.call(card), "[object Card]");
    }
    t.deepEqual(deck.count, 0);
    t.deepEqual(deck.pull(), void 0);
});

test("CardDeck#toArray()", t => {
    const deck = new CardDeck();
    const { count } = deck;
    const result = deck.toArray();

    t.deepEqual(deck.count, count, "CardDeck.count property should not be changed when calling CardDeck#toArray()!");
    t.deepEqual(result, Array.from(deck));
});

test("CardDeck#values()", t => {
    const deck = new CardDeck();
    const { count } = deck;
    const result = deck.values();

    t.deepEqual(deck.count, count, "CardDeck.count property should not be changed when calling CardDeck#values()!");
    t.deepEqual(typeof result.next, "function");
    t.deepEqual(Array.from(result), deck.toArray());
});

test("CardDeck#reset() - all includes", t => {
    const deck = new CardDeck();
    const suits = ["spade", "slub", "diamond", "heart"];
    const copy = deck.toArray();
    const compare = (a, b) => {
        if (a.suit !== b.suit) {
            return suits.indexOf(a.suit) - suits.indexOf(b.suit);
        }
        return a.number - b.number;
    };

    deck.reset();

    t.deepEqual(deck.toArray().sort(compare), copy.sort(compare));
});

test("CardDeck#reset() - isShuffle", t => {
    const deck = new CardDeck();
    const copy = deck.toArray();

    deck.reset();
    const results = deck.toArray();

    t.true(deck.count !== 0);
    t.notDeepEqual(copy, results, "The order of the cards has not been changed.");
});