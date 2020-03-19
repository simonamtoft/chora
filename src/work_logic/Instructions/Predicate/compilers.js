import { parseNum, parseReg } from "../../../helpers/misc";

export const compile_reg = (pred, pd, ps1, ps2, func) => {
	let binary = [0];

	pred = parseNum(pred);
	func = parseNum(func);
	pd = parseReg(pd);
	ps1 = ps1[0] === "!" ? 0b1000 | parseReg(ps1) : parseReg(ps1);
	ps2 = ps1[0] === "!" ? 0b1000 | parseReg(ps1) : parseReg(ps2);

	binary[0] |= pred << 27;
	binary[0] |= 0b01000 << 22;
	binary[0] |= pd << 17;
	binary[0] |= ps1 << 12;
	binary[0] |= ps2 << 7;
	binary[0] |= 0b100 << 4;
	binary[0] |= func << 0;

	return binary;
};
