export const instTypes = [
	"add", "addi", "addl", "sub", "subi", "subl", "xor", "xori", "xorl", "sl", "sli", "sll",
	"sr", "sri", "srl", "sra", "srai", "sral", "nor", "norl", "shadd", "shadd2", "btest", "btesti",
	"cmpeq", "cmpeqi", "cmple", "cmplei", "cmplt", "cmplti", "cmpneq", "cmpneqi", "cmpule", "cmpulei",
	"cmpult", "cmpulti", "lbc", "lbl", "lbm", "lbs", "lbuc", "lbul", "lbum", "lbus", "lhc", "lhl", 
	"lhm", "lhs", "lhuc", "lhul", "lhum", "lhus", "lwc", "lwl", "lwm", "lws", "mul", "mulu", "pand",
	"por", "pxor", "sbc", "sbl", "sbm", "sbs", "shc", "shl", "shm", "shs", "swc", "swl", "swm", "sws",
	"bcopy", "mfs", "mts", "sens", "sfree", "sres", "sspill" // Missing control-flow 
];

// Arrays of types strings
const binTypes = [
	"add", "addi", "addl", "sub", "subi", "subl", "xor", "xori", "xorl", "sl", "sli", "sll",
	"sr", "sri", "srl", "sra", "srai", "sral", "nor", "norl", "shadd", "shadd2"
];
const compTypes = [
	"btest", "btesti", "cmpeq", "cmpeqi", "cmple", "cmplei", "cmplt", "cmplti", 
	"cmpneq", "cmpneqi", "cmpule", "cmpulei", "cmpult", "cmpulti"
];
// not implemented/tested for fields 
const loadTypes = [
	"lbc", "lbl", "lbm", "lbs", "lbuc", "lbul", "lbum", "lbus", "lhc", "lhl", 
	"lhm", "lhs", "lhuc", "lhul", "lhum", "lhus", "lwc", "lwl", "lwm", "lws" 
];
// not implemented for fields, need to set imm as second reg instead of third.
const storeTypes = [
	"sbc", "sbl", "sbm", "sbs", "shc", "shl", "shm", "shs", "swc", "swl", "swm", "sws" 
];
// not implemented
const mulTypes = [
	"mul", "mulu"	
];
// not implemented 
const stackTypes = [
	"sens", "sfree", "sres", "sspill"
];

// Arrays of register strings
const regStr = [
	"r0", "r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8", "r9", "r10", 
	"r11", "r12", "r13", "r14", "r15", "r16", "r17", "r18", "r19", "r20", 
	"r21", "r22", "r23", "r24", "r25", "r26", "r27", "r28", "r29", "r30", "r31"
];
const pregStr = [
	"p0", "p1", "p2", "p3", "p4", "p5", "p6", "p7"
];
const sregStr = [
	"s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", 
	"s10", "s11", "s12", "s13", "s14", "s15"
];

export const checkSpecial = (line, inst) => {
	let hasLabel = instTypes.includes(inst[1]) ? 1 : 0;
	let feedback = "";
	let type = inst[0 + hasLabel];
	let parse1 = binTypes.includes(type) | compTypes.includes(type);
	let parse2 = loadTypes.includes(type);
	let parse3 = storeTypes.includes(type);

	if (parse1) {
		feedback += checkSpecial1(line, hasLabel);
	} else if (parse2) {
		feedback += checkSpecial2(line, hasLabel); 
	} else if (parse3) {
		feedback += checkSpecial3(line, hasLabel);
	}
	return feedback;
};

// Binary and Compare types
// Syntax: type rd = s1, s2
const checkSpecial1 = (line, hasLabel) => {
	let feedback = "";
	// eslint-disable-next-line no-control-regex
	line = line.trim().replace("=", " = ").split(/[ 	]+/);

	// Currently only displays first error...
	if (line[2 + hasLabel] !== "=") {
		feedback += "Missing equalsign after rd.\n";
	} else if (!hasComma(line[3 + hasLabel])) {
		feedback += "Missing comma afer rs1.\n";
	}
	return feedback;
};

// Load types
// Syntax: type rd = [s1 + s2]
const checkSpecial2 = (line, hasLabel) => {
	let feedback = "";
	// eslint-disable-next-line no-control-regex
	line = line.trim().replace("=", " = ").replace("+", " + ").replace("[", " [ ").replace("]", " ] ").split(/[ 	]+/);

	// Currently only displays first error...
	if (line[2 + hasLabel] !== "=") {
		feedback += "Missing '=' after rd.\n";
	} else if (line[3 + hasLabel] !== "[") {
		feedback += "Missing '[' before s1.\n";
	} else if (line[5 + hasLabel] !== "+") {
		feedback += "Missing '+' between s1 and s2.\n";
	} else if (line[7 + hasLabel] !== "]") {
		feedback += "Missing ']' after s2.\n";
	}	
	return feedback;
};

// StoreTypes
// Syntax: type [rd + imm] = s1
const checkSpecial3 = (line, hasLabel) => {
	let feedback = "";
	// eslint-disable-next-line no-control-regex
	line = line.trim().replace("=", " = ").replace("[", " [ ").replace("]", " ] ").split(/[ 	]+/);

	// Currently only displays first error...
	if (line[1 + hasLabel] !== "[") {
		feedback += "Missing '[' before rd.\n";
	} else if (line[3 + hasLabel] !== "+") {
		feedback += "Missing '+' between rd and imm.\n";
	} else if (line[5 + hasLabel] !== "]") {
		feedback += "Missing ']' after imm.\n";
	} else if (line[6 + hasLabel] !== "+") {
		feedback += "Missing '=' before s1.\n";
	}
	
	return feedback;
};

export const checkFields = (inst) => {
	let feedback = "";
	let hasLabel = instTypes.includes(inst[1]) ? 1 : 0;
	let type = inst[0 + hasLabel];
	let isStack = stackTypes.includes(type);
	let isMul = mulTypes.includes(type);


	feedback += checkF0(inst, hasLabel);
	feedback += checkF1(inst, hasLabel, type);

	if (!isStack) {
		feedback += checkF2(inst, hasLabel);
	}

	if (!isMul & !isStack) {
		feedback += checkF3(inst, hasLabel);
	}

	return feedback;
};

// Check field 0 (type)
const checkF0 = (inst, hasLabel) => {
	let feedback = "";

	if (!instTypes.includes(inst[0 + hasLabel])) {
		feedback += `Type "${inst[0 + hasLabel]}" not recognized.\n`;
	}

	return feedback;
};

// Checks field 1
const checkF1 = (inst, hasLabel, type) => {
	let wrongReg = false, isReg = false, regType;
	let feedback = "";
	let idx = 1 + hasLabel;
	let field = inst[idx];

	// Write protect r0
	if (field === "r0") {
		feedback += `Field ${idx}: Register r0 is write protected.\n`;
	}

	// Check destination register type is correct
	regType = getRdType(type);
	switch(regType) {
		case "r":
			wrongReg = sregStr.includes(field) | pregStr.includes(field);
			isReg = regStr.includes(field);
			break;
		case "s":
			wrongReg = regStr.includes(field) | pregStr.includes(field);
			isReg = sregStr.includes(field);
			break;
		case "p":
			wrongReg = regStr.includes(field) | sregStr.includes(field);
			isReg = pregStr.includes(field);
			break;
	}

	if (wrongReg) {
		feedback += `Field ${idx}: "${field}" should be a ${regType}-register.\n`;
	} else if (!isReg) {
		if (field !== undefined) {
			feedback += `Field ${idx}: "${field}" is not a register.\n`;
		} else {
			feedback += `Field ${idx}: Missing.\n`;
		}
	}
	return feedback;
};


// Check field 2
const checkF2 = (inst, hasLabel) => {
	let feedback = "";
	let idx = 2 + hasLabel;
	let field = inst[idx];
	let isReg = regStr.includes(field) | sregStr.includes(field) | pregStr.includes(field);
	
	if (!isReg) {
		if (field !== undefined) {
			feedback += `Field ${idx}: "${field}" is not a register.\n`;
		} else {
			feedback += `Field ${idx}: Missing`;
		}
	}
	return feedback;
};

// Check field 3
const checkF3 = (inst, hasLabel) => {
	let feedback = "";
	let idx = 3 + hasLabel;
	let field = inst[idx];
	let isReg = regStr.includes(field) | sregStr.includes(field) | pregStr.includes(field);

	if (!isReg) {
		if (isNaN(field)) {
			if (field !== undefined) {
				feedback += `Field ${idx}: "${field}" is neither a register or immediate.\n`;
			} else {
				feedback += `Field ${idx}: Missing.\n`;
			}
		} 
	}
	return feedback;
};


/**
 * @param {string} 		type		- Type of the instruction 
 * @returns {string}	regType 	- Destination register: r, s or p
 */
const getRdType = (type) => {
	let regType;

	if (binTypes.includes(type) | loadTypes.includes(type) | storeTypes.includes(type)) {
		regType = "r";
	} else if (compTypes.includes(type)) {
		regType = "p";
	}
	return regType;
};

/**
 * @param {string} 	line 		- One line from the user editor
 * @returns {array}	fields 		- Returns all the fields.
 */
export const parseLineToInst = (line) => {
	// eslint-disable-next-line no-useless-escape
	line = line.trim().replace(/[=+\[\]:]/g, "").replace("#", "# "); 
	// eslint-disable-next-line no-control-regex
	line = line.split(/[ 	,]+/);
	return line;
};

// Checks if there is a comma after the register field
const hasComma = (rfield) => {
	rfield = rfield.trim().replace(",", " ,");
	if (rfield.slice(rfield.length - 1) !== ",") {
		if (rfield === ",") {
			return true;
		}
		return false;
	}
	return true;
};