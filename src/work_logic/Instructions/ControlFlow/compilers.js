import { parseNum, parseReg } from "../../../helper";

export const compile_reg = (pred, d, op, rs1) => {
    let binary = [0];

    pred = parseNum(pred);
    d = parseNum(d);
	op = parseNum(op);
	rs1 = parseReg(rs1);

	binary[0] |= pred << 27;
	binary[0] |= 0b1100 << 23;
	binary[0] |= d << 22;
	binary[0] |= rs1 << 12;
    binary[0] |= 0b01 << 2;
    binary[0] |= op << 0;

    return binary;
};

export const compile_reg2 = (pred, d, op, rs1, rs2) => {
    let binary = [0];

    pred = parseNum(pred);
    d = parseNum(d);
	op = parseNum(op);
	rs1 = parseReg(rs1);
	rs2 = parseReg(rs2);

	binary[0] |= pred << 27;
	binary[0] |= 0b1100 << 23;
	binary[0] |= d << 22;
	binary[0] |= rs1 << 12;
	binary[0] |= rs2 << 7;
    binary[0] |= 0b10 << 2;
    binary[0] |= op << 0;

    return binary;
};

export const compile_ireg = (pred, d, op) => {
    let binary = [0];

    pred = parseNum(pred);
    d = parseNum(d);
	op = parseNum(op);

    binary[0] |= pred << 27;
	binary[0] |= 0b1100 << 23;
	binary[0] |= d << 22;
    binary[0] |= 0b00 << 2;
    binary[0] |= op << 0;

    return binary;
};

export const compile_imm = (pred, op, d, imm) => {
	let binary = [0];

    pred = parseNum(pred);
	op = parseNum(op);
	d = parseNum(d); 
	imm = parseNum(imm);

    binary[0] |= pred << 27;
	binary[0] |= 0b10 << 25;
	binary[0] |= op << 23;
    binary[0] |= d << 22;
    binary[0] |= imm << 0;

    return binary;
}

