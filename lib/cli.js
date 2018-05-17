"use strict";

const promptly = require("promptly");

/* eslint-disable no-console */

const play = async ({ input, output }) => {
    output.write("では始めましょう。\n");
    output.write("(中略)\n");
    await promptly.prompt("適当に文字を打ってください。:", { retry: false, input, output});
};

const run = async ({ input = process.stdin, output = process.stdout } = {}) => {
    output.write("ブラックジャックへようこそ！\n");
    if (await promptly.confirm("ゲームしますか？(y or n): ", { input, output })) {
        do {
            await play({ input, output });
        } while (await promptly.confirm("もう一度行いますか？(y or n): ", { input, output }));
    }
    output.write("bay\n");
};

module.exports = run;
