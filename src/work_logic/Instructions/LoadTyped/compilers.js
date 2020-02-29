import { parseNum, parseReg } from "../../../helper";

export const compile_reg = (pred, rd, ra, type, imm) => {
    let binary = [0];

    pred = parseNum(pred);
    imm = parseNum(imm);
    type = parseNum(type);
    rd = parseReg(rd);
    ra = parseReg(ra);

    binary[0] |= pred << 27;
    binary[0] |= 0b01010 << 22;
    binary[0] |= rd << 17;
    binary[0] |= ra << 12;
    binary[0] |= type << 7;
    binary[0] |= imm << 0;

    return binary;
};
