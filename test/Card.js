const test = require("ava");
const { Card } = require("../lib/Card");

test("Card - constructor", t => {
    const card = new Card("spade", 1);

    t.deepEqual(card.suit, "spade");
    t.deepEqual(card.number, 1);
});

test("Card - constructor: suit required", t => {
    t.throws(() => new Card(), "suit required");
});

test("Card - constructor: not suit error", t => {
    const input = "error";

    t.throws(() => new Card(input), `${input} not suits!`);
});

test("Card - constructor: number required", t => {
    const suit = "spade";

    t.throws(() => new Card(suit), "number required");
});

test("Card - constructor: Range Error", t => {
    const suit = "spade";
    const errorMsg = "Card number range is from 0 to 13 only";

    t.throws(() => new Card(suit, -1), errorMsg);
    t.throws(() => new Card(suit, 14), errorMsg);
});

test("Card - constructor: numberis string", t => {
    const suit = "spade";
    const card = new Card(suit, "1");

    t.deepEqual(card.number, 1);
});

test("Card - constructor: number is A", t => {
    const suit = "spade";
    const card = new Card(suit, "A");

    t.deepEqual(card.number, 1);
});

test("Card - constructor: number is J", t => {
    const suit = "spade";
    const card = new Card(suit, "J");

    t.deepEqual(card.number, 11);
});

test("Card - constructor: number is Q", t => {
    const suit = "spade";
    const card = new Card(suit, "Q");

    t.deepEqual(card.number, 12);
});

test("Card - constructor: number is K", t => {
    const suit = "spade";
    const card = new Card(suit, "K");

    t.deepEqual(card.number, 13);
});

test("Card#[@@toStringTag]", t => {
    const card = new Card("spade", 1);
    const { toString } = Object.prototype;

    t.deepEqual(toString.call(card), "[object Card]");
});

test("Card#valueOf", t => {
    const card1 = new Card("spade", "K");
    const card2 = new Card("slub", 1);
    const card3 = new Card("diamond", 3);
    const card4 = new Card("heart", "Q");

    t.true(Number(card1) === Number(card1));
    t.true(Number(card2) === Number(card2));
    t.true(Number(card3) === Number(card3));
    t.true(Number(card4) === Number(card4));
    t.true(Number(card1) < Number(card2));
    t.true(Number(card2) < Number(card3));
    t.true(Number(card3) < Number(card4));
});