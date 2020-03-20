const pseudoTypes = [
	"mov", "clr", "neg", "not", "li", "nop", "isodd", "pmov", "pnot", "pset", "pclr"
];

const pseudoMapping = {
	"MOV_RR" 	: "add {1} = {2}, 0",  		// add 
	"CLR" 		: "add {1} = r0, 0", 		// add
	"NEG" 		: "sub {1} = r0, {2}",		// sub
	"NOT" 		: "nor {1} = {2}, r0",		// nor
	"LI_POS" 	: "add {1} = r0, {2}",		// add
	"LI_NEG" 	: "sub {1} = r0, {2}",		// sub
	"NOP"		: "sub r0 = r0, 0", 		// sub, fix write protect for this one
	"ISODD" 	: "btest {1} = {2}, r0",	// btest
	"MOV_PR" 	: "cmpneq {1} = {2}, r0",	// cmpneq
	"PMOV" 		: "por {1} = {2}, {2}",		// por
	"PNOT" 		: "pxor {1} = {2}, p0",		// pxor
	"PSET" 		: "por {1} = p0, p0",		// por
	"PCLR"		: "pxor {1} = p0, p0",		// pxor
	"MOV_RP" 	: "bcopy {1} = r0, 0, {2}" 	// bcopy
};

export { pseudoTypes, pseudoMapping };
