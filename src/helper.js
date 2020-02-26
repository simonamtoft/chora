function toNum(input) {
    return typeof input == "number" ? input : Number(input);
}

function toOther(input) {
    return typeof input == "number" ? input : Number(input.match(/\d+/i)[0]);
}