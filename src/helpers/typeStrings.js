const instTypes = [
	"add", "addi", "addl", "sub", "subi", "subl", "xor", "xori", "xorl", "sl", "sli", "sll",
	"sr", "sri", "srl", "sra", "srai", "sral", "nor", "norl", "shadd", "shadd2", "btest", "btesti",
	"cmpeq", "cmpeqi", "cmple", "cmplei", "cmplt", "cmplti", "cmpneq", "cmpneqi", "cmpule", "cmpulei",
	"cmpult", "cmpulti", "lbc", "lbl", "lbm", "lbs", "lbuc", "lbul", "lbum", "lbus", "lhc", "lhl", 
	"lhm", "lhs", "lhuc", "lhul", "lhum", "lhus", "lwc", "lwl", "lwm", "lws", "mul", "mulu", "pand",
	"por", "pxor", "sbc", "sbl", "sbm", "sbs", "shc", "shl", "shm", "shs", "swc", "swl", "swm", "sws",
	"bcopy", "mfs", "mts", "sens", "sfree", "sres", "sspill",
	"callnd", "call", "brnd", "br", "brcfnd", "brcf", "trap", "retnd", "ret", "xretnd", "xret",
];
const binTypes = [
	"add", "addi", "addl", "sub", "subi", "subl", "xor", "xori", "xorl", "sl", "sli", "sll",
	"sr", "sri", "srl", "sra", "srai", "sral", "nor", "norl", "shadd", "shadd2"
];
const compTypes = [
	"btest", "btesti", "cmpeq", "cmpeqi", "cmple", "cmplei", "cmplt", "cmplti", 
	"cmpneq", "cmpneqi", "cmpule", "cmpulei", "cmpult", "cmpulti"
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
// not implemented 
const stackTypes = [
	"sens", "sfree", "sres", "sspill"
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
];

const getInstType = (type) => {
	let idx, key, keys;

	// Just an idea here... Would be smart to keep the error message with the regEx
	// Such that it returns together with regex and if it doesn't match, it throws 
	// how it should look like. 

	let instTypeStr = {
		bin 	: binTypes.includes(type),
		comp 	: compTypes.includes(type),
		load	: loadTypes.includes(type),
		store 	: storeTypes.includes(type),
		mul		: mulTypes.includes(type),
		stack	: stackTypes.includes(type),
		pred 	: predTypes.includes(type),
		cf 		: cfTypes.includes(type),
		p1		: type === "mov" || type === "isodd" || type === "pmov",
	};
	
	keys = Object.keys(instTypeStr);
	
	for (idx in keys) {
		key = keys[idx];
		if (instTypeStr[key]) { return key; }
	}
	return type;
};


export { instTypes, binTypes, compTypes, loadTypes, storeTypes, mulTypes, stackTypes, predTypes, moveTypes, cfTypes, getInstType };
