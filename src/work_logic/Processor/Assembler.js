import CPU from "./CPU";
import { instTypes, binTypes, compTypes, loadTypes, storeTypes, mulTypes, stackTypes, predTypes, moveTypes } from "../../helpers/typeStrings";
import { regStr, pregStr, sregStr, allRegStr } from "../../helpers/regStrings";

class Assembler {
	constructor() {
		this.errorMessage = [];
		this.instQue = [];
		this.binary = [];
		this.labels = {};
		this.queLength = 0;
		this.cpu = new CPU();
	}

	reset() {
		this.errorMessage = [];
		this.instQue = [];
		this.binary = [];
		this.labels = {};
		this.queLength = 0;
		this.cpu.reset();
	}


	run(editor) {
		editor = trimEditor(editor);

		for (let i = 0; i < editor.length; i++) {
			this.parse(editor[i].trim(), i);
		}
 
		// Error handling
		if (this.errorMessage.length !== 0) {
			return false;
		}
		this.queLength = this.instQue.length;
		return true;
	}

	parse(line, idx) {
		let type, regExMatch, regEx, inst = [];

		// Get first regex match
		regEx = /^(?!#)(?:(\w+):\s*)?(?:\((!?)(p\d)\)\s+)?(\w+)\s+/i;
		regExMatch = line.match(regEx);

		if (regExMatch === null) {
			this.errorMessage[idx] = "Needs to be on form: label: (px) type ...";
			return false;
		}
		
		// Extract Label
		if (regExMatch[1] !== undefined) {
			this.labels[regExMatch[1]] = idx;
		}

		// Set predicate
		// add error checking etc. to predicate 
		inst[0] = regExMatch[3] ? Number(regExMatch[3].replace("p", "")) : 0;
		if (regExMatch[2] === "!") {
			inst[0] |= 8;
		}

		// Check type
		type = regExMatch[4];
		inst[1] = type;
		if (!instTypes.includes(type)) {
			this.errorMessage[idx] = `${type} is not a recognized instruction.`;
			return false;
		}

		// Get & check operators 
		regEx = getRegEx(type);
		line = line.split(type)[1].trim();
		regExMatch = line.match(regEx);
		if (regExMatch === null) {
			this.errorMessage[idx] = "Missing operators.";
			return false;
		}
		let opError = checkOperators(type, regExMatch);
		if (opError !== "") {
			this.errorMessage[idx] = opError;
			return false;
		}
		// Append operators to inst
		inst = inst.concat(regExMatch.slice(1,regExMatch.length));

		// Check end-of-line 
		let remainder, lastOp;
		lastOp = regExMatch[regExMatch["length"] - 1];

		if (loadTypes.includes(type)) {
			remainder = regExMatch["input"].split(`${lastOp}]`);
		} else {
			remainder = regExMatch["input"].split(lastOp);
		}
		remainder = remainder[remainder.length-1].trim();

		if (remainder) {
			this.errorMessage[idx] = `Remove from end-of-line: ${remainder}.`;
			return false;
		}

		// Return stuff
		this.instQue[idx] = inst;
		this.binary[idx] = this.cpu.getBinary(inst);
		return true;
	}
}

/**
 * 
 * @param {string} 	type		- Instruction type 
 * @param {Array} 	regExMatch 	- Fields after inst type [rd, s1, s2]
 */
const checkOperators = (type, regExMatch) => {
	let errorMessage = "";
	
	// Check destination register
	errorMessage += checkDesReg(type, regExMatch[1]);
	
	// Check register "numbers".
	errorMessage += checkOp(regExMatch[2], type);
	errorMessage += checkOp(regExMatch[3], type);

	return errorMessage;
};

// Outputs wrong des if not correct des.
const checkDesReg = (type, des) => {
	let desType, idx, mapReg;
	mapReg = ["r", "p", "s"];
	desType = [
		(binTypes.includes(type) || loadTypes.includes(type) || storeTypes.includes(type) || type === "mfs") && !regStr.includes(des),
		(compTypes.includes(type) || predTypes.includes(type)) && !pregStr.includes(des),
		type === "mts" && !sregStr.includes(des),
		// Mul & Stack doesn't have a des reg, thus handled by RegEx only.
	];
	idx = desType.indexOf(true);

	if (des === "r0" | des === "p0") {
		return `Register ${des} is write protected.`;
	} 

	if (idx === -1) {
		return "";
	}
	return `Type ${type} should write to ${mapReg[idx]}-reg not ${des[0]}-reg.`;
};

const checkOp = (op) => {
	if (op !== undefined & isNaN(op)) {
		if (!allRegStr.includes(op)) {
			return `${op} is not a register/immediate.`;
		}
	}
	return "";
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
		stackTypes.includes(type)
	];
	
	switch(syntax.indexOf(true)) {
		case 0:
			return /([rp]\d{1,2})\s*=\s*([rp]\d{1,2})\s*,\s*([rp]?\d+)/i;
		case 1:
			return /(r\d{1,2})\s*=\s*\[(r\d{1,2})\s*\+\s*(\d+)\]/i;
		case 2: 
			return /\[(r\d{1,2})\s*\+\s*(\d+)\]\s*=\s*(r\d{1,2})/i;
		case 3:
			return /([rs]\d{1,2})\s*=\s*([rs]\d{1,2})/i;
		case 4:
			return /(r\d{1,2})\s*,\s*(r\d{1,2})/i;
		case 5:
			return /(\d+)\s?/i;
		default: 
			return "none";
	}
};


/**
 * Removes empty lines and comments
 * @param 	{string} 	editor 		- User input editor 
 * @returns {array}		editorLines - Array of lines that are not empty or comments
 */
const trimEditor = (editor) => {
	let line, lineCount, idx, editorLines = [], emptyCount = 0;

	editor = editor.split(/\r\n|\r|\n/);
	lineCount = editor.length;
	
	for (let i = 0; i < lineCount; i++) {
		line = editor[i].trim();

		// Remove commentsp
		idx = line.indexOf("#");
		if (idx !== -1) {
			line = line.substring(0, idx); 	
		}

		// Skip empty lines
		if (line === "") {
			emptyCount += 1;
		} else {
			editorLines[i-emptyCount] = line;
		}
	}
	return editorLines;
};

export default Assembler;
