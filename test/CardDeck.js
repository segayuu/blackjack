const test = require("ava");
const { CardDeck } = require("../lib/CardDeck");

test("CardDeck - reset()", t => {
    const deck = new CardDeck();
    const suits = ["spade", "slub", "diamond", "heart"];
    const copy = deck.collection.slice();

    deck.reset();
    const results = deck.collection;

    t.notDeepEqual(copy, results, "The order of the cards has not been changed.");

    const compare = (a, b) => {
        if (a.suit !== b.suit) {
            return suits.indexOf(a.suit) - suits.indexOf(b.suit);
        }
        return a.number - b.number;
    };

    t.deepEqual(results.slice().sort(compare), copy.sort(compare));
});

test("cardDeck - count", t => {
    const deck = new CardDeck();
    let sum = 52;

    while (deck.count) {
        deck.pull();
        t.deepEqual(deck.count, deck.collection.length);
        t.deepEqual(deck.count, --sum);
    }
    t.deepEqual(deck.count, 0);
});

test("cardDeck - pull", t => {
    const deck = new CardDeck();
    let card;

    while (typeof (card = deck.pull()) === "object") {
        t.true(card.hasOwnProperty("number"));
        t.true(card.hasOwnProperty("suit"));
    }

    t.deepEqual(deck.pull(), (void 0));
    t.deepEqual(deck.count, 0);
});

test("cardDeck - iterable", t => {
    const deck = new CardDeck();

    for (const card of deck) {
        t.true(card.hasOwnProperty("number"));
        t.true(card.hasOwnProperty("suit"));
    }
    t.deepEqual(deck.count, 0);
});