import { parseNum, parseReg } from '../../../helper'

export const compile_reg = (pred, pd, rs1, rs2, func) => {
    let binary = [0];

    pred = parseNum(pred);
    func = parseNum(func);
    pd = parseNum(pd);
    rs1 = parseReg(rs1);
    rs2 = parseReg(rs2);

    binary[0] |= pred << 27;
    binary[0] |= 0b01000 << 22;
    binary[0] |= rd << 17;
    binary[0] |= rs1 << 12;
    binary[0] |= rs2 << 7;
    binary[0] |= 0b011 << 4;
    binary[0] |= func << 0;
    return binary;
};

export const compile_imm = (pred, pd, rs1, imm, func) => {
    let binary = [0];

    pred = parseNum(pred);
    func = parseNum(func);
    imm = parseNum(imm);
    pd = parseReg(pd);
    rs1 = parseReg(rs1);
    
    binary[0] |= pred << 27;
    binary[0] |= 0b01000 << 22;
    binary[0] |= rd << 17;
    binary[0] |= rs1 << 12;
    binary[0] |= imm << 7;
    binary[0] |= 0b110 << 4;
    binary[0] |= func << 0;
    return binary;
};

