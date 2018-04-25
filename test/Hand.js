const test = require("ava");
const { Card } = require("../lib/Card");
const { Hand } = require("../lib/Hand");

test("Hand#push()", t => {
    const suit = "spade";
    const $number = 1;
    const hand = new Hand();

    hand.push(new Card(suit, $number));
    t.pass();
});

test.todo("Hand#first()");
test("Hand#total", t => {
    const hand = new Hand();

    hand.push(new Card("spade", "J"));
    t.deepEqual(hand.total, 10);
    hand.push(new Card("spade", 1));
    t.deepEqual(hand.total, 11);
});
test("Hand#isBurst", t => {
    const hand = new Hand();

    hand.push(new Card("spade", 10));
    t.false(hand.isBurst);
    hand.push(new Card("spade", 2));
    t.false(hand.isBurst);
    hand.push(new Card("heart", 10));
    t.true(hand.isBurst);
});
test.todo("Hand#list()");
test.todo("Hand#[@@iterator]");
test.todo("Hand#clear()");