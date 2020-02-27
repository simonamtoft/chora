import { parseNum, parseReg } from "../../../helper";

const compile_reg = (pred, rs1, sd) => {
    let binary = [0];

    pred = parseNum(pred);
    rs1 = parseReg(rs1);
    sd = parseReg(sd); 

    binary[0] |= pred << 27;
    binary[0] |= 0b01001 << 22;
    binary[0] |= rs1 << 12;
    binary[0] |= 0b010 << 4;
    binary[0] |= sd << 0;

    return binary;
};

class Mts {
    constructor(pred, rs1, sd) {
        this.pred = pred;
        this.rs1 = rs1;
        this.sd = sd;
        this.memory = compile_reg(pred, rs1, sd);
    }

    execute({ reg }) {
        reg[this.sd] = reg[this.rs1];
    }
}

export default Mts;
