const instTypes = [
	"add", "addi", "addl", "sub", "subi", "subl", "xor", "xori", "xorl", "sl", "sli", "sll",
	"sr", "sri", "srl", "sra", "srai", "sral", "nor", "norl", "shadd", "shadd2", "btest", "btesti",
	"cmpeq", "cmpeqi", "cmple", "cmplei", "cmplt", "cmplti", "cmpneq", "cmpneqi", "cmpule", "cmpulei",
	"cmpult", "cmpulti", "lbc", "lbl", "lbm", "lbs", "lbuc", "lbul", "lbum", "lbus", "lhc", "lhl", 
	"lhm", "lhs", "lhuc", "lhul", "lhum", "lhus", "lwc", "lwl", "lwm", "lws", "mul", "mulu", "pand",
	"por", "pxor", "sbc", "sbl", "sbm", "sbs", "shc", "shl", "shm", "shs", "swc", "swl", "swm", "sws",
	"bcopy", "mfs", "mts", "sens", "sfree", "sres", "sspill" // Missing control-flow 
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

const getInstType = (type) => {
	let idx, key, keys;
	let instTypeStr = {
		bin 	: binTypes.includes(type),
		comp 	: compTypes.includes(type),
		pred 	: predTypes.includes(type),
		load	: loadTypes.includes(type), 
		store 	: storeTypes.includes(type),
		move	: moveTypes.includes(type),
		mul		: mulTypes.includes(type),
		stack	: stackTypes.includes(type),
		pseudo1	: type === "mov" || type === "isodd" || type === "pmov"
	};
	
	keys = Object.keys(instTypeStr);
	
	for (idx in keys) {
		key = keys[idx];
		if (instTypeStr[key]) {
			return key;
		}
	}
	return type;
};


export { instTypes, binTypes, compTypes, loadTypes, storeTypes, mulTypes, stackTypes, predTypes, moveTypes, getInstType };
