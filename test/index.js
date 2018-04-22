import test from "ava";
import tester from "../";

test("test", t => {
    const input = "test";
    const result = tester.test(input);

    t.deepEqual(input, result);
    t.pass();
});

