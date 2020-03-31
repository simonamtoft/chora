import { parseNum, parseReg } from "../../../Helpers/misc";

export const compile_reg = (pred, rs1, rs2, func) => {
	let binary = [0];

	pred = parseNum(pred);
	func = parseNum(func);
	rs1 = parseReg(rs1);
	rs2 = parseReg(rs2);

	binary[0] |= pred << 27;
	binary[0] |= 0b01000 << 22;
	binary[0] |= rs1 << 12;
	binary[0] |= rs2 << 7;
	binary[0] |= 0b010 << 4;
	binary[0] |= func << 0;

	return binary;
};
