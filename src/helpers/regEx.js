import { binTypes, compTypes, loadTypes, storeTypes, 
	mulTypes, stackTypes, predTypes, moveTypes } from "./typeStrings";

// All instruction regular expressions
const regEx = {
	// Label, pred, type
	"first" : /^(?!#)(?:(\w+):\s*)?(?:\((!?)(p\d)\)\s+)?(\w+)\s+/,	// label: (ps) type

	// Normal instructions
	0 		: /([rp]\d{1,2})\s*=\s*([rp]\d{1,2})\s*,\s*([rp]?\d+)/, // rd/pd = rs1/ps1, rs2/ps2/imm
	1 		: /(r\d{1,2})\s*=\s*\[(r\d{1,2})\s*\+\s*(\d+)\]/, 		// rd = [rs + imm]
	2 		: /\[(r\d{1,2})\s*\+\s*(\d+)\]\s*=\s*(r\d{1,2})/, 		// [rd + imm] = rs
	3 		: /([rs]\d{1,2})\s*=\s*([rs]\d{1,2})/,					// rd/sd = rs/ss
	4		: /(r\d{1,2})\s*,\s*(r\d{1,2})/, 						// rs1, rs2
	5 		: /(\d+)\s?/, 											// imm
	"bcopy"	: /(r\d{1,2})\s*=\s*(r\d{1,2}),\s*(\d+),\s*(p\d)/, 		// rd = rs, imm, ps

	// Pseudo instructions
	6 		: /([rp]\d{1,2})\s*=\s*([rp]\d{1,2})/, // mov, isodd, pmov
	"clr"	: /([rp]\d{1,2})/, 										// rd/pd
	"neg"	: /(r\d{1,2})\s*=\s*-\s*(r\d{1,2})/,					// rd = -rs
	"not"	: /(r\d{1,2})\s*=\s*~\s*(r\d{1,2})/,					// rd = ~rs
	"li"	: /(r\d{1,2})\s*=\s*(-{0,1}\d+)/,						// rd = imm
	"nop" 	: /\s*/,												// 
	"pset"	: /(p\d)\s*=\s*(\d)/,									// pd = binary
	"pnot"	: /(p\d)\s*=\s*~\s*(p\d)/,								// pd = ~ps
	"pclr"	: /(p\d)\s*=\s*(0)/,									// pd = 0
};

/**
 * Gets regular expression from type
 * @param {string} 	type  - Instruction type
 * @returns a regular expression
 */
const getRegEx = (type) => {
	let syntax = [
		binTypes.includes(type) || compTypes.includes(type) || predTypes.includes(type),
		loadTypes.includes(type), 
		storeTypes.includes(type),
		moveTypes.includes(type),
		mulTypes.includes(type),
		stackTypes.includes(type),
		
		// Pseudo instructions
		type === "mov" || type === "isodd" || type === "pmov",
	];
	if (syntax === -1) {
		return regEx[type];
	}
	return regEx[syntax.indexOf(true)];
};


export { getRegEx };
