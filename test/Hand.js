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

test.todo("Hand#isBurst()");
test.todo("Hand#list()");
test.todo("Hand#[@@iterator]");
test.todo("Hand#clear()");