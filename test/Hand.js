const test = require("ava");
const { Card } = require("../dist/Card");
const { Hand } = require("../dist/Hand");

test("Hand#push()", t => {
    const card = new Card("spade", 1);
    const hand = new Hand();

    hand.push(card);
    t.deepEqual(hand.list()[0], card);
});
test.todo("Hand#list()");
test.todo("Hand#clear()");
test("Hand#[@@iterator]()", t => {
    const hand = new Hand();
    const card1 = new Card("spade", 1);
    const card2 = new Card("spade", 2);
    const card3 = new Card("spade", 3);

    hand.push(card1);
    hand.push(card2);
    hand.push(card3);

    const iter = hand[Symbol.iterator]();

    t.deepEqual({ value: card1, done: false }, iter.next());
    t.deepEqual({ value: card2, done: false }, iter.next());
    t.deepEqual({ value: card3, done: false }, iter.next());
    t.true(iter.next().done);
});
