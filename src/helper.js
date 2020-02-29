export const parseNum = (input) => typeof input == "number" ? input : Number(input);
export const parseReg = (input) => typeof input == "number" ? input : Number(input.match(/\d+/i)[0]);
export const toUint32 = (n) => n >>> 0;
export const toInt32 = (n) => n | 0;