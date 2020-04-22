// Arrays of register strings
const regStr = [
	"r0", "r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8", "r9", "r10", 
	"r11", "r12", "r13", "r14", "r15", "r16", "r17", "r18", "r19", "r20", 
	"r21", "r22", "r23", "r24", "r25", "r26", "r27", "r28", "r29", "r30", "r31"
];
const pregStr = [
	"p0", "p1", "p2", "p3", "p4", "p5", "p6", "p7",
	"!p0", "!p1", "!p2", "!p3", "!p4", "!p5", "!p6", "!p7",
];
const sregStr = [
	"s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", 
	"s10", "s11", "s12", "s13", "s14", "s15"
];
const allRegStr = [].concat(
	regStr, pregStr, sregStr
);

const sregMap = {
	sl : "s2",
	sh : "s3",
	ss : "s5",
	st : "s6",
	srb : "s7",
	sro : "s8",
	sxb : "s9",
	sxo : "s10",
};

export { regStr, pregStr, sregStr, allRegStr, sregMap };
