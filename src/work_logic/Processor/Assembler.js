import CPU from "./CPU";
import { instTypes, loadTypes } from "../../helpers/typeStrings";
import { pseudoTypes, pseudoMapping } from "../../helpers/pseudo";
import { regStr } from "../../helpers/regStrings";
import { getRegEx } from "../../helpers/regEx";

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
	}

	run(editor) {
		let queLength, nopCount;
		this.reset();

		editor = trimEditor(editor);
		queLength = editor.length;
		nopCount = 0;

		// Parse first line
		if (editor[0] !== undefined) {this.parse(editor[0].trim(), 0); }
		
		// Parse remaining lines
		for (let i = 1; i < (queLength + nopCount); i++) {
			this.parse(editor[i-nopCount].trim(), i);

			// Overwrite already set inst with a nop if inst  
			// would use the destination reg of previous load 
			if (loadTypes.includes(this.instQue[i-1][1])) {
				if (this.instQue[i].includes(this.instQue[i-1][2])) {
					this.insertnop(i);
					nopCount += 1;
				}
			}
		}
 
		// Error handling
		if (this.errorMessage.length === 0) {
			this.queLength = this.instQue.length;
			console.log("No errors in editor.");
		} else {
			console.log(this.errorMessage);
		}
	}

	insertnop(idx) {
		this.originalCode[idx] = [""];
		this.instQue[idx] = [0, "nop"];
		this.binary[idx] = 0;
	}

	parse(line, idx) {
		let label, neg, pred;
		let type, regExMatch, inst = [];

		// Need to handle nop first. (nops is only type.)
		if (line.split(" ")[0] === "nop") {
			this.originalCode[idx] = ["nop"];
			this.instQue[idx] = ["~", "sub", "r0", "r0", "0"];
			this.binary[idx] = 0x00400000;
			return true;
		}
		
		// Get first regex match
		regExMatch = line.match(getRegEx("first"));
		if (regExMatch === null) {
			this.errorMessage[idx] = "Want form, label: (ps) type 'rest of inst' ";
			return false;
		}

		// Set fields
		label = regExMatch[1];
		neg   = regExMatch[2] === "!";
		pred  = regExMatch[3];
		type  = regExMatch[4];

		// Extract Label
		if (label) { this.labels[label] = idx; }

		// Set predicate
		inst[0] = pred ? Number(pred.replace("p", "")) : 0;
		if (neg) { inst[0] |= 8; }

		// Check type of inst and handle appropriately
		if (instTypes.includes(type)) {
			inst = this.handleNormalInst(line, type, regExMatch, idx, inst);
			if (inst !== -1) { this.originalCode[idx] = inst; }
		} else if (pseudoTypes.includes(type)) {
			inst = this.handlePseudoInst(line, type, regExMatch, idx, inst);
		} else {
			this.errorMessage[idx] = `${type} is not a recognized instruction.`;
			inst = -1;
		}
		
		// Output parsed instruction line from editor
		if (inst === -1) { return false; }
		this.instQue[idx] = inst;
		this.binary[idx] = this.cpu.getBinary(inst);
		return true;
	}

	handleNormalInst = (line, type, regExMatch, idx, inst) => {
		// Get reg ex match
		line = line.split(type)[1].trim();
		regExMatch = line.match(getRegEx(type));

		if (regExMatch === null) {
			this.errorMessage[idx] = "Missing operators.";
			return -1;
		}
		if (!this.checkEndOfLine(type, regExMatch, idx)) { return -1; }

		// Return inst
		inst[1] = type; 
		return inst.concat(regExMatch.slice(1, regExMatch.length));
	};

	handlePseudoInst = (line, type, regExMatch, idx, inst) => {
		let match, ptype;

		line = line.split(type)[1].trim();
		regExMatch = line.match(getRegEx(type));

		// Check if instruction is typed in correctly... Maybe change these 3 things into 1 function instead??
		if (regExMatch === null) {
			this.errorMessage[idx] = "Missing operators on pseudo inst.";
			return -1;
		}
		if (!this.checkEndOfLine(type, regExMatch, idx)) { return -1; }

		// Output pseudo
		this.originalCode[idx] = [type, regExMatch[1], regExMatch[2]];
		
		// Change line to basic code
		match = [regExMatch[1], regExMatch[2]];	// [rd, s1] 
		ptype = type.toUpperCase(); 			// The mapping has the pseudo types as uppercase 

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
		line = pseudoMapping[ptype].replace(/{(\d+)}/g, (_, n) => match[n-1]);
		type = line.split(" ")[0].trim();

		// Handle basic code as normal inst
		return this.handleNormalInst(line, type, regExMatch, idx, inst);
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

/**
 * Removes empty lines and comments
 * @param 	{string} 	editor 		- User input editor 
 * @returns {array}		editorLines - Array of lines that are not empty or comments
 */
const trimEditor = (editor) => {
	let line, idx, editorLines = [], emptyCount = 0;
	editor = editor.split(/\r\n|\r|\n/);
	
	for (let i = 0; i < editor.length; i++) {
		line = editor[i].trim();

		// Remove comments
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
