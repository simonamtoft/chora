const pseudoTypes = [
	"mov", "clr", "neg", "not", "li", "nop", "isodd", "pmov", "pnot", "pset", "pclr"
];
const binTypes = [
	"add", "addi", "addl", "sub", "subi", "subl", "xor", "xori", "xorl", "sl", "sli", "sll",
	"sr", "sri", "srl", "sra", "srai", "sral", "nor", "norl", "shadd", "shadd2", "or", "ori", "orl",
	"and", "andi", "andl",
];
const compTypes = [
	"btest", "btesti", "cmpeq", "cmpieq", "cmple", "cmpile", "cmplt", "cmpilt", 
	"cmpneq", "cmpineq", "cmpule", "cmpiule", "cmpult", "cmpiult"
];
const loadTypes = [
	"lbc", "lbl", "lbm", "lbs", "lbuc", "lbul", "lbum", "lbus", "lhc", "lhl", 
	"lhm", "lhs", "lhuc", "lhul", "lhum", "lhus", "lwc", "lwl", "lwm", "lws" 
];
const storeTypes = [
	"sbc", "sbl", "sbm", "sbs", "shc", "shl", "shm", "shs", "swc", "swl", "swm", "sws" 
];
const mulTypes = [
	"mul", "mulu"	
];
const stackTypes = [
	"sens", "sfree", "sres", "sspill",
	"sspillr", "sensr",
];
const predTypes = [
	"pand", "por", "pxor"
];
const moveTypes = [
	"mts", "mfs"
];
const cfTypes = [
	"callnd", "call", "brnd", "br", "brcfnd", "brcf", "trap",
	"retnd", "ret", "xretnd", "xret",

	// Single reg
	"callndr", "callr", "brndr", "brr",

	// Two reg
	"brcfr", "brcfndr"
];
const bitCopyTypes = [
	"bcopy"
];

const instTypes = [].concat(
	pseudoTypes, binTypes, compTypes, loadTypes, storeTypes, 
	mulTypes, stackTypes, predTypes, moveTypes, cfTypes, bitCopyTypes
);

const pseudoMapping = {
	"MOV_RR" 	: "add {1} = {2}, 0",  		// add 
	"CLR" 		: "add {1} = r0, 0", 		// add
	"NEG" 		: "sub {1} = r0, {2}",		// sub
	"NOT" 		: "nor {1} = {2}, r0",		// nor
	"LI_POS" 	: "add {1} = r0, {2}",		// add
	"LI_NEG" 	: "sub {1} = r0, {2}",		// sub
	"NOP"		: "sub r0 = r0, 0", 		// sub
	"ISODD" 	: "btest {1} = {2}, r0",	// btest
	"MOV_PR" 	: "cmpneq {1} = {2}, r0",	// cmpneq
	"PMOV" 		: "por {1} = {2}, {2}",		// por
	"PNOT" 		: "pxor {1} = {2}, p0",		// pxor
	"PSET" 		: "por {1} = p0, p0",		// por
	"PCLR"		: "pxor {1} = p0, p0",		// pxor
	"MOV_RP" 	: "bcopy {1} = r0, 0, {2}" 	// bcopy
};

// Checks if type is allowed in pipeline two. 
const allowedPipelineTwo = (type) => {
	return binTypes.includes(type) || compTypes.includes(type);
};

const getInstType = (type) => {
	let idx, key, keys;

	let instTypeStr = {
		bin 	: binTypes.includes(type),
		comp 	: compTypes.includes(type),
		load	: loadTypes.includes(type),
		store 	: storeTypes.includes(type),
		mul		: mulTypes.includes(type),
		stack	: stackTypes.includes(type),
		pred 	: predTypes.includes(type),
		cf 		: cfTypes.includes(type),
	};
	
	keys = Object.keys(instTypeStr);
	
	for (idx in keys) {
		key = keys[idx];
		if (instTypeStr[key]) return key;
	}
	return type;
};


export { instTypes, binTypes, compTypes, loadTypes, storeTypes, mulTypes, 
	stackTypes, predTypes, moveTypes, cfTypes, getInstType, allowedPipelineTwo,
	pseudoTypes, pseudoMapping };
