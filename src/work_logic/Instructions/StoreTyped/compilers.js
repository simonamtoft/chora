import { parseNum, parseReg } from "../../../helpers/misc";

export const compile_reg = (pred, type, ra, rs, offset) => {
	let binary = [0];

	pred = parseNum(pred);
	type = parseNum(type);
	ra = parseReg(ra);
	rs = parseReg(rs);
	offset = parseNum(offset);

	binary[0] |= pred << 27;
	binary[0] |= 0b01011 << 22;
	binary[0] |= type << 17;
	binary[0] |= ra << 12;
	binary[0] |= rs << 7;
	binary[0] |= offset << 0;

	return binary;
};
