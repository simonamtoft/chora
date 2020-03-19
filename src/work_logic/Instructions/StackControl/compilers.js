import { parseNum, parseReg } from "../../../helpers/misc";

export const compile_reg = (pred, op, rs) => {
	let binary = [0];

	pred = parseNum(pred);
	op = parseNum(op);
	rs = parseReg(rs);

	binary[0] |= pred << 27;
	binary[0] |= 0b01100 << 22;
	binary[0] |= op << 20;
	binary[0] |= 0b01 << 18;
	binary[0] |= rs << 12;

	return binary;
};

export const compile_imm = (pred, op, imm) => {
	let binary = [0];

	pred = parseNum(pred);
	op = parseNum(op);
	imm = parseNum(imm);

	binary[0] |= pred << 27;
	binary[0] |= 0b01100 << 22;
	binary[0] |= op << 20;
	binary[0] |= 0b00 << 18;
	binary[0] |= imm << 0;

	return binary;
};

