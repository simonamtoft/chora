import CPU from "./CPU";
import { instTypes, binTypes, compTypes, loadTypes, storeTypes, 
	mulTypes, stackTypes, predTypes, moveTypes } from "../../helpers/typeStrings";
import { pseudoTypes, pseudoMapping } from "../../helpers/pseudo";
import { regStr, pregStr, sregStr, allRegStr } from "../../helpers/regStrings";

class Assembler {
	constructor() {
		this.errorMessage = [];
		this.instQue = [];
		this.binary = [];
		this.originalCode = [];
		this.labels = {};
		this.queLength = 0;
		this.cpu = new CPU();
	}

	reset() {
		this.errorMessage = [];
		this.instQue = [];
		this.binary = [];
		this.pseudo = [];
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
		if (this.errorMessage.length === 0) {
			this.queLength = this.instQue.length;
		}
	}

	parse(line, idx) {
		let type, regExMatch, regEx, inst = [];

		if (line.split(" ")[0] === "nop") {
			this.originalCode[idx] = ["nop"];
			this.instQue[idx] = ["~", "sub", "r0", "r0", "0"];
			this.binary[idx] = 0x00400000;
			return true;
		}
		

		// Get first regex match
		regEx = /^(?!#)(?:(\w+):\s*)?(?:\((!?)(p\d)\)\s+)?(\w+)\s+/;
		regExMatch = line.match(regEx);

		if (regExMatch === null) {
			this.errorMessage[idx] = "Want form, label: (ps) type 'rest of inst' ";
			return false;
		}
		
		// Extract Label
		if (regExMatch[1] !== undefined) {
			this.labels[regExMatch[1]] = idx;
		}

		// Set predicate
		let pred = regExMatch[3];
		// if (!pregStr.includes(pred) && pred !== undefined) {
		// 	this.errorMessage[idx] = `${pred} is not a predicate`;
		// 	return false;
		// }
			
		inst[0] = pred ? Number(pred.replace("p", "")) : 0;
		if (regExMatch[2] === "!") {
			inst[0] |= 8;
		}

		// Handle inst as normal or pseudo inst 
		type = regExMatch[4];
		if (instTypes.includes(type)) {
			inst = this.handleNormalInst(line, type, regExMatch, idx, inst);
			if (inst!==-1) {this.originalCode[idx] = inst;}
		} else if (pseudoTypes.includes(type)) {
			inst = this.handlePseudoInst(line, type, regExMatch, idx, inst);
		} else {
			this.errorMessage[idx] = `${type} is not a recognized instruction.`;
			inst = -1;
		}
		
		// Return stuff
		if (inst === -1) {
			return false;
		}
		this.instQue[idx] = inst;
		this.binary[idx] = this.cpu.getBinary(inst);
		return true;
	}

	handleNormalInst = (line, type, regExMatch, idx, inst) => {
		inst[1] = type; 
	
		// Get reg ex match
		line = line.split(type)[1].trim();
		regExMatch = line.match(getRegEx(type));

		// Check if instruction is typed in correctly... Maybe change these 3 things into 1 function instead??
		if (regExMatch === null) {
			this.errorMessage[idx] = "Missing operators.";
			return -1;
		}
		if (!this.checkOperators(type, regExMatch, idx)) {
			return -1;
		}
		if (!this.checkEndOfLine(type, regExMatch, idx)) {
			return -1;
		}

		// Append operators to inst
		return inst.concat(regExMatch.slice(1, regExMatch.length));
	};

	handlePseudoInst = (line, type, regExMatch, idx, inst) => {
		let match, ptype;

		line = line.split(type)[1].trim();
		regExMatch = line.match(getRegEx(type));

		// Check if instruction is typed in correctly... Maybe change these 3 things into 1 function instead??
		if (regExMatch === null) {
			return -1;
		}
		if (!this.checkOperators(type, regExMatch, idx)) {
			return -1;
		}
		if (!this.checkEndOfLine(type, regExMatch, idx)) {
			return -1;
		}

		// Output pseudo
		this.originalCode[idx] = [type, regExMatch[1], regExMatch[2]];
		
		// Change line to basic code
		match = [regExMatch[1], regExMatch[2]];	// [rd, s1] 
		ptype = type.toUpperCase(); // The mapping has the pseudo types as uppercase 
		if (ptype === "LI") {
			ptype = "LI_POS";
			if (Number(match[1]) < 0) {
				ptype = "LI_NEG";
				match[1] = -match[1];
			} 
		} else if (ptype === "MOV") {
			ptype += "_";

			if (regStr.includes(match[0])) {
				ptype += "R";
			} else {
				ptype += "P";
			}

			if (regStr.includes(match[1])) {
				ptype += "R";
			} else {
				ptype += "P";
			}
		}
		line = pseudoMapping[ptype].replace(/{(\d+)}/g, (_, n) => match[n-1]); // insert des and op into inst string

		// Get type
		type = line.split(" ")[0].trim();

		// Handle basic code as normal inst
		return this.handleNormalInst(line, type, regExMatch, idx, inst);
	};


	/**
	 * 
	 * @param {string} 	type		- Instruction type 
	 * @param {Array} 	regExMatch 	- Fields after inst type [rd, s1, s2]
	 */
	checkOperators = (type, regExMatch, idx) => {
		let errorMessage = "";
		
		// Check destination register
		errorMessage += checkDesReg(type, regExMatch[1]);
		
		// Check register "numbers".
		errorMessage += checkOp(regExMatch[2], type);
		errorMessage += checkOp(regExMatch[3], type);
		
		if (errorMessage === "") {
			return true;
		}
		this.errorMessage[idx] = errorMessage;
		return false;
	};

	checkEndOfLine = (type, regExMatch, idx) => {
		let remainder, lastOp;
		lastOp = regExMatch[regExMatch["length"] - 1];
	
		if (loadTypes.includes(type)) {
			remainder = regExMatch["input"].split(`${lastOp}]`); // loadtype ends with 'op2]' not just op2.
		} else {
			remainder = regExMatch["input"].split(lastOp);
		}
		remainder = remainder[remainder.length-1].trim();
	
		if (remainder) {
			this.errorMessage[idx] = `Remove from end-of-line: ${remainder}.`;
			return false;
		}
		return true;
	};
}


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
		stackTypes.includes(type),
		

		// Pseudo instructions
		type === "mov" || type === "isodd" || type === "pmov",
		type === "clr",
		type === "neg",
		type === "not",
		type === "li", 
		type === "nop", 
		type === "pset", 
		type === "pnot",
		type === "pclr",

		// 
		type === "bcopy"
	];
	
	switch(syntax.indexOf(true)) {
		case 0:
			return /([rp]\d{1,2})\s*=\s*([rp]\d{1,2})\s*,\s*([rp]?\d+)/;
		case 1:
			return /(r\d{1,2})\s*=\s*\[(r\d{1,2})\s*\+\s*(\d+)\]/;
		case 2: 
			return /\[(r\d{1,2})\s*\+\s*(\d+)\]\s*=\s*(r\d{1,2})/;
		case 3:
			return /([rs]\d{1,2})\s*=\s*([rs]\d{1,2})/;
		case 4:
			return /(r\d{1,2})\s*,\s*(r\d{1,2})/;
		case 5:
			return /(\d+)\s?/;
		
		// Pseudo instructions
		case 6: 
			return /([rp]\d{1,2})\s*=\s*([rp]\d{1,2})/;
		case 7: 
			return /([rp]\d{1,2})/;
		case 8: 
			return /(r\d{1,2})\s*=\s*-\s*(r\d{1,2})/;
		case 9: 
			return /(r\d{1,2})\s*=\s*~\s*(r\d{1,2})/;
		case 10: 
			return /(r\d{1,2})\s*=\s*(-{0,1}\d+)/;
		case 11: 
			return /\s*/; // nop....
		case 12: 
			return /(p\d{1})\s*=\s*(\d{1})/;
		case 13:
			return /(p\d)\s*=\s*~\s*(p\d)/;
		case 14:
			return /(p\d)\s*=\s*(0)/;
		
		case 15:
			return /(r\d{1,2})\s*=\s*(r\d{1,2}),\s*(\d+),\s*(p\d)/;
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
