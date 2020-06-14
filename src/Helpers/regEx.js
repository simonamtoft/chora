import { getInstType } from "./typeStrings";

// All instruction regular expressions
const regEx = {
	// Label, pred, type
	"first" : [/^(?!#)(?:(\w+):\s*)?(?:\((!?)(p\d)\)\s+)?(\w+)\s*/i,						"label: (ps) type"],

	// Normal instructions (new)
	"bin" 	: [/^(r\d{1,2})\s*=\s*(r\d{1,2})\s*,\s*\(?([^()\s]+)\)?$/i, 					"rd = rs1, op2"],
	"comp"	: [/^(p\d)\s*=\s*(r\d{1,2})\s*,\s*(r?(?:0x)?(?:0b)?\d+)$/i,						"pd = rs1, op2"],
	"load"	: [/^(r\d{1,2})\s*=\s*\[(r\d{1,2})\s*\+\s*(\w+)\]$/i,  							"rd = [rs + imm]"],
	"store"	: [/^\[(r\d{1,2})\s*\+\s*((?:0x)?(?:0b)?\d+)\]\s*=\s*(r\d{1,2})$/i,				"[rd + imm] = rs"],
	"mul"	: [/^(r\d{1,2})\s*,\s*(r\d{1,2})$/i,											"rs1, rs2"],
	"stack"	: [/^(r?(?:0x)?(?:0b)?\d+)\s?$/i,												"op2"],
	"pred"	: [/^(p\d)\s*=\s*(!?p\d)\s*,\s*(!?p\d)$/i,										"pd = ps1, ps2"],
	"cf"	: [/^\s*(-?\w*),?\s*(\w*)$/i,													"label"],
	"mts"	: [/^(sro|srb|sxo|sxb|sl|sh|ss|st|s\d{1,2})\s*=\s*(r\d{1,2})$/i,				"sd = rs"],
	"mfs"	: [/^(r\d{1,2})\s*=\s*(sro|srb|sxo|sxb|sl|sh|ss|st|s\d{1,2})$/i,				"rd = ss"],		
	"bcopy"	: [/^(r\d{1,2})\s*=\s*(r\d{1,2}),\s*((?:0x)?(?:0b)?\d+),\s*(!?p\d)$/i,			"rd = rs, imm, [!]ps"],

	// Pseudo instructions
	"mov"	: [/^([rp]\d{1,2})\s*=\s*([rp]\d{1,2})$/i, 										"rd/pd = rs/ps"],
	"pmov"	: [/^(p\d)\s*=\s*(p\d)$/i, 														"pd = ps"],
	"isodd"	: [/^(p\d)\s*=\s*(r\d{1,2})$/i, 												"pd = rs"],
	"clr"	: [/^([rp]\d{1,2})$/i, 															"rd/pd"],
	"neg"	: [/^(r\d{1,2})\s*=\s*-\s*(r\d{1,2})$/i,										"rd = -rs"],
	"not"	: [/^(r\d{1,2})\s*=\s*!\s*(r\d{1,2})$/i,										"rd = !rs"],
	"li"	: [/^(r\d{1,2})\s*=\s*(\(?([^()\s]+)\)?)$/i,									"rd = imm"],
	"nop" 	: [/^\s*$/i,																	"nop"],
	"pset"	: [/^(p\d)\s*=\s*1$/i,															"pd = 1"],
	"pnot"	: [/^(p\d)\s*=\s*!\s*(p\d)$/i,													"pd = !ps"],
	"pclr"	: [/^(p\d)\s*=\s*(0)$/i,														"pd = 0"],
};

/**
 * Gets regular expression from type
 * @param {string} 	type  - Instruction type
 * @returns a regular expression
 */
const getRegEx = (type) => {
	if (regEx[getInstType(type)] === undefined) {return -1; }
	return regEx[getInstType(type)][0];
};

const getRegExError = (type) => {
	if (regEx[getInstType(type)] === undefined) {return -1; }
	return `Instruction ${type} should be on form: ${regEx[getInstType(type)][1]}`;
};

export { getRegEx, getRegExError };
