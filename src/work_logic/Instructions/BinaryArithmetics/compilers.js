import { parseNum, parseReg } from "../../../helpers/misc";

export const compile_reg = (pred, rd, rs1, rs2, func) => {
	let binary = [0];

	pred = parseNum(pred);
	func = parseNum(func);
	rd = parseReg(rd);
	rs1 = parseReg(rs1);
	rs2 = parseReg(rs2);

	binary[0] |= pred << 27;
	binary[0] |= 0b01000 << 22;
	binary[0] |= rd << 17;
	binary[0] |= rs1 << 12;
	binary[0] |= rs2 << 7;
	binary[0] |= func << 0;

	return binary;
};

export const compile_imm = (pred, func, rd, rs1, imm) => {
	let binary = [0];

	pred = parseNum(pred);
	func = parseNum(func);
	imm = parseNum(imm);
	rd = parseReg(rd);
	rs1 = parseReg(rs1);

	binary[0] |= pred << 27;
	binary[0] |= (func & 0x7) << 22;
	binary[0] |= rd << 17;
	binary[0] |= rs1 << 12;
	binary[0] |= imm << 0;

	return binary;
};

export const compile_long = (pred, rd, rs1, func, long) => {
	let binary = [0, 0];

	pred = parseNum(pred);
	func = parseNum(func);
	long = parseNum(long);
	rd = parseReg(rd);
	rs1 = parseReg(rs1);

	binary[0] |= 1 << 31;
	binary[0] |= pred << 27;
	binary[0] |= 0b11111 << 22;
	binary[0] |= rd << 17;
	binary[0] |= rs1 << 12;
	binary[0] |= func;
	binary[1] = long & 0xFFFFFFFF;
    
	return binary;
};
