import { parseNum, parseReg } from "../../../helper";

export const compile_reg = (pred, pd, rs1, rs2, func) => {
    let binary = [0];

    pred = parseNum(pred);
    func = parseNum(func);
    pd = parseNum(pd);
    rs1 = parseReg(rs1);
    rs2 = parseReg(rs2);

    binary[0] |= pred << 27;
    binary[0] |= 0b01000 << 22;
    binary[0] |= pd << 17;
    binary[0] |= rs1 << 12;
    binary[0] |= rs2 << 7;
    binary[0] |= 0b011 << 4;
    binary[0] |= func << 0;

    return binary;
};
