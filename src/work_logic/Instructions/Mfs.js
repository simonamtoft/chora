import { parseNum, parseReg } from '../../../helper'

export const compile_reg = (pred, rd, ss) => {
    let binary = [0];

    pred = parseNum(pred);
    rd = parseReg(rd);
    ss = parseReg(ss); 

    binary[0] |= pred << 27;
    binary[0] |= 0b01001 << 22;
    binary[0] |= rd << 17;
    binary[0] |= 0b011 << 4;
    binary[0] |= ss << 0;

    return binary;
};

class Mfs {
    constructor(pred, rd, ss) {
        this.pred = pred;
        this.rd = rd;
        this.ss = ss;
        this.memory = compile_reg(pred, rs1, sd);
    }

    execute({ reg }) {
        reg[this.rd] = reg[this.ss]
    }
}

export default Mfs
