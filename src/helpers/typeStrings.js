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

export { instTypes, binTypes, compTypes, loadTypes, storeTypes, mulTypes, stackTypes, predTypes, moveTypes };
