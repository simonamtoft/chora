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

/**
 * Checks syntax of line. Only use if fields are already correct.
 * @param {string} 	line 	- One line from editor.
 * @param {array} 	inst 	- One correctly parsed instruction.
 */
export const checkSyntax = (line, inst) => {
	let feedback = "", syntax;
	let preceeding = checkPreceeding(inst);
	let type = inst[preceeding];

	// Different syntaxes
	syntax = [
		binTypes.includes(type) | compTypes.includes(type) | predTypes.includes(type),
		loadTypes.includes(type), 
		storeTypes.includes(type),
		moveTypes.includes(type),
		mulTypes.includes(type),
		stackTypes.includes(type)
	];

	if (syntax[0]) {
		feedback += checkSyntaxOne(line, preceeding);
	} else if (syntax[1]) {
		feedback += checkSyntaxTwo(line, preceeding); 
	} else if (syntax[2]) {
		feedback += checkSyntaxThree(line, preceeding);
	} else if (syntax[3]) {
		feedback += checkSyntaxFour(line, preceeding);
	} else if (syntax[4]) {
		feedback += checkSyntaxFive(line, preceeding);
	} else if (syntax[5]) {
		feedback += checkSyntaxSix(line, preceeding);
	} else {
		feedback += `Syntax for type ${type} not defined`;
	}
	return feedback;
};

/**
 * Checks syntax for Binary Arithmetics and Compare instructions.
 * Syntax: type rd = s1, s2
 * @param 	{string} line 		- A line from the editor. 
 * @param 	{number} preceeding - 0, 1 or 2 depending on leading label/predicate
 * @returns {string} feedback	- Error message.
 */
const checkSyntaxOne = (line, preceeding) => {
	let feedback = "";
	// eslint-disable-next-line no-control-regex
	line = line.trim().replace("=", " = ").split(/[ 	]+/);

	// Currently only displays first error...
	if (line[2 + preceeding] !== "=") {
		feedback += "Missing equalsign after rd.\n";
	} else if (!hasComma(line[3 + preceeding])) {
		feedback += "Missing comma afer rs1.\n";
	}
	return feedback;
};

/**
 * Checks syntax for Loadtyped instructions
 * Syntax: type rd = [rs1 + imm]
 * @param 	{string} line 		- A line from the editor. 
 * @param 	{number} preceeding - 0, 1 or 2 depending on leading label/predicate
 * @returns {string} feedback	- Error message.
 */
const checkSyntaxTwo = (line, preceeding) => {
	let feedback = "";
	// eslint-disable-next-line no-control-regex
	line = line.trim().replace("=", " = ").replace("+", " + ").replace("[", " [ ").replace("]", " ] ").split(/[ 	]+/);

	// Currently only displays first error...
	if (line[2 + preceeding] !== "=") {
		feedback += "Missing '=' after rd.\n";
	} else if (line[3 + preceeding] !== "[") {
		feedback += "Missing '[' before s1.\n";
	} else if (line[5 + preceeding] !== "+") {
		feedback += "Missing '+' between s1 and s2.\n";
	} else if (line[7 + preceeding] !== "]") {
		feedback += "Missing ']' after s2.\n";
	}	
	return feedback;
};

/**
 * Checks syntax for Storetyped instructions
 * Syntax: type [rd + imm] = s1
 * @param 	{string} line 		- A line from the editor. 
 * @param 	{number} preceeding - 0, 1 or 2 depending on leading label/predicate
 * @returns {string} feedback	- Error message.
 */
const checkSyntaxThree = (line, preceeding) => {
	let feedback = "";
	// eslint-disable-next-line no-control-regex
	line = line.trim().replace("=", " = ").replace("[", " [ ").replace("]", " ] ").split(/[ 	]+/);

	// Currently only displays first error...
	if (line[1 + preceeding] !== "[") {
		feedback += "Missing '[' before rd.\n";
	} else if (line[3 + preceeding] !== "+") {
		feedback += "Missing '+' between rd and imm.\n";
	} else if (line[5 + preceeding] !== "]") {
		feedback += "Missing ']' after imm.\n";
	} else if (line[6 + preceeding] !== "=") {
		feedback += "Missing '=' before s1.\n";
	}
	
	return feedback;
};

/**
 * Checks syntax for Move Special instructions
 * Syntax: type r1 = r2
 * @param 	{string} line 		- A line from the editor. 
 * @param 	{number} preceeding - 0, 1 or 2 depending on leading label/predicate
 * @returns {string} feedback	- Error message.
 */
const checkSyntaxFour = (line, preceeding) => {
	let feedback = "";
	// eslint-disable-next-line no-control-regex
	line = line.trim().replace("=", " = ").split(/[ 	]+/);

	if (line[2 + preceeding] !== "=") {
		feedback += "Missing '=' between the two registers.\n";
	}
	return feedback;
};

/**
 * Checks syntax for Multiply instructions
 * Syntax: type r1, r2
 * @param 	{string} line 		- A line from the editor. 
 * @param 	{number} preceeding - 0, 1 or 2 depending on leading label/predicate
 * @returns {string} feedback	- Error message.
 */
const checkSyntaxFive = (line, preceeding) => {
	let feedback = "";
	// eslint-disable-next-line no-control-regex
	line = line.trim().split(/[ 	]+/);

	if (!hasComma(line[1 + preceeding])) {
		feedback += "Missing comma afer rs1.\n";
	}

	return feedback;
};

const checkSyntaxSix = (line, preceeding) => {
	let feedback = "";
	// eslint-disable-next-line no-control-regex
	line = line.trim().split(/[ 	]+/);
	
	// add check for any unwanted stuff?

	if ((line[2 + preceeding] !== undefined) & (line[2 + preceeding] !== "#")) {
		feedback += "Unwanted end of line chars";
	}

	return feedback;
};


/**
 * Check all the fields of an instruction
 * @param 	{string}	inst		- A parsed instruction.
 * @returns {string}	feedback 	- Error message.
 */
export const checkFields = (inst) => {
	let feedback = "";
	let type = inst[checkPreceeding(inst)];
	let isStack = stackTypes.includes(type);
	let isMul = mulTypes.includes(type);
	let isMove = moveTypes.includes(type);
	let isStore = storeTypes.includes(type);
	let isPred = predTypes.includes(type);
	let isLoad = loadTypes.includes(type);
	let isCopy = type === "bcopy";

	if (isStack) { 
		feedback += checkImm(inst, 1); // Stack only has one field
	} else if (isMul) {
		feedback += checkReg(inst, type, 1);
		feedback += checkReg(inst, type, 2);
	} else {
		// Destination
		feedback += checkReg(inst, type, 1);
		feedback += writeProtect(inst, 1);	

		// Source 1
		if (isStore) {
			feedback += checkImm(inst, 2);
		} else {
			feedback += checkReg(inst, type, 2);
		}

		// Source 2
		// Doesn't exist for move
		if (!isMove) {
			if (isLoad | isCopy) {
				feedback += checkImm(inst, 3);
			} else if (isStore | isPred) {
				feedback += checkReg(inst, type, 3);
			} else {
				feedback += checkRegImm(inst, 3);
			}
		}

		// Source 3 - Bitcopy only
		if (isCopy) {
			feedback += checkReg(inst, type, 4);
		}
	}
	return feedback;
};

// Write protect r0, p0
const writeProtect = (inst, idx) => {
	let field, feedback = "";
	
	idx += checkPreceeding(inst);
	field = inst[idx];
	
	if (field === "r0") {
		feedback += `Field ${idx}: Register r0 is write protected.\n`;
	} else if (field === "p0") {
		feedback += `Field ${idx}: Register p0 is write protected.\n`;
	}
	return feedback;
};

// Checks register & type
const checkReg = (inst, type, idx) => {
	let wrongReg = false, isReg = false, regType, field;
	let feedback = "";
	
	regType = getRegType(type, idx);
	idx += checkPreceeding(inst);
	field = inst[idx];

	// Check register type is correct
	switch(regType) {
		case "r":
			wrongReg = sregStr.includes(field) | pregStr.includes(field);
			break;
		case "s":
			wrongReg = regStr.includes(field) | pregStr.includes(field);
			break;
		case "p":
			wrongReg = regStr.includes(field) | sregStr.includes(field);
			break;
		case "all":
			wrongReg = false;
			break;
	}

	isReg = regStr.includes(field) | pregStr.includes(field) | sregStr.includes(field);
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


// Checks source reg/imm
const checkRegImm = (inst, idx) => {
	let field, feedback = "";
	
	idx += checkPreceeding(inst);
	field = inst[idx];

	// Check if field is reg/imm
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

// Checks source imm
const checkImm = (inst, idx) => {
	let field, feedback = "";
	
	idx += checkPreceeding(inst);
	field = inst[idx];

	if (isNaN(field)) {
		if (field !== undefined) {
			feedback += `Field ${idx}: "${field}" is not an immediate.\n`;
		} else {
			feedback += `Field ${idx}: Missing.\n`;
		}
	}
	return feedback;
};

/**
 * @param {string} 		type		- Type of the instruction 
 * @returns {string}	regType 	- Destination register: r, s or p
 */
const getRegType = (type, idx) => {
	let regType, rs = false, ps = false, ss = false;

	switch(idx) {
		// Destination
		case 1:
			rs = binTypes.includes(type) | loadTypes.includes(type) | storeTypes.includes(type) | type === "mfs";
			ps = compTypes.includes(type) | predTypes.includes(type); // control flow // bcopy
			ss = type === "mts";
			break;
		
		// Source 1
		case 2: 
			rs = type === "mts";
			ps = predTypes.includes(type);
			ss = type === "mfs";
			break;

		// Source 2
		case 3: 
			break;
		
		// Source 3
		case 4:
			ps = type === "bcopy";
			break;
	}

	if (rs) {
		regType = "r";
	} else if (ps) {
		regType = "p";
	} else if (ss) {
		regType = "s";
	} else {
		regType = "all";
	}
	return regType;
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

// Check for label and predicate
const checkPreceeding = (inst) => {
	if (instTypes.includes(inst[2])) {
		return 2;
	} else if (instTypes.includes(inst[1])) {
		return 1;
	} else {
		return 0;
	}
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
