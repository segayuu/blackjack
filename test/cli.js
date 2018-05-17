const test = require("ava");
const run = require("../lib/cli");
const { promisify } = require("util");
const { Buffer } = require("buffer");
const { Readable, Writable } = require("stream");
const { readFile } = require("graceful-fs");
const readFileAsync = promisify(readFile);

const nop = () => {};

test(t => {
    t.true(typeof run === "function");
});

test(async t => {
    const specPromise = readFileAsync(`${__dirname}\\test_n.txt`);
    const input = new Readable({ read: nop });
    const array = [];
    const output = new Writable({
        write(chunk, encoding, cb) {
            array.push(encoding === "buffer" ? chunk : Buffer.from(chunk, encoding));
            cb();
        }
    });

    const promise = run({input, output});

    input.push("n\nn", "utf8");
    await promise;

    const spec = await specPromise;

    t.deepEqual(Buffer.concat(array), spec);
});
