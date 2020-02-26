function parseNum(input) {
    return typeof input == "number" ? input : Number(input);
}

function parseReg(input) {
    return typeof input == "number" ? input : Number(input.match(/\d+/i)[0]);
}