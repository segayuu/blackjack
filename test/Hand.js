const test = require("ava");
const { Card } = require("../lib/Card");
const { Hand } = require("../lib/Hand");

test("Hand#push()", t => {
    const card = new Card("spade", 1);
    const hand = new Hand();

    hand.push(card);
    t.deepEqual(hand.list()[0], card);
});
test.todo("Hand#list()");
test.todo("Hand#clear()");
