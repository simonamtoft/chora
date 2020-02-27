import { parseNum, parseReg } from "../../../helper";

export const compile_reg = (pred, rd, rs1, imm, ps) => {
    let binary = [0];

    pred = parseNum(pred);
    imm = parseNum(imm);
    rd = parseReg(rd);
    rs1 = parseReg(rs1);
    ps = parseReg(ps); 

    binary[0] |= pred << 27;
    binary[0] |= 0b01000 << 22;
    binary[0] |= rd << 17;
    binary[0] |= rs1 << 12;
    binary[0] |= imm << 7;
    binary[0] |= 0b101 << 4;
    binary[0] |= ps << 0;

    return binary;
};

class Bcopy {
    constructor(pred, rd, rs1, imm, ps) {
        this.rd = rd;
        this.rs1 = rs1;
        this.imm = imm;
        this.ps = ps; 
        this.binary = compile_reg(pred, rd, rs1, imm, ps); 
    }

    execute({ reg }) {
        reg[this.rd] = (reg[this.rs1] & !(1 << this.imm)) | (reg[this.ps] << this.imm);
    }

}

export default Bcopy;
