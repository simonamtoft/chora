import CPU from "./CPU";
import { instTypes, binTypes, compTypes, loadTypes, storeTypes, mulTypes, stackTypes, predTypes, moveTypes } from "../../helpers/typeStrings";

class Assembler {
	constructor() {
		this.errorMessage = [];
		this.instQue = [];
		this.binary = [];
		this.labels = {};
		this.queLength = 0;
		this.cpu = new CPU();
		this.error = false;
	}

	reset() {
		this.errorMessage = [];
		this.instQue = [];
		this.binary = [];
		this.labels = {};
		this.queLength = 0;
		this.cpu.reset();
		this.error = false;
	}


	run(editor) {
		let instCount = 0;
		editor = trimEditor(editor);

		for (let i = 0; i < editor.length; i++) {
			if(this.parse(editor[i].trim(), instCount)) {
				instCount += 1;
			}
		}
 
		// Error message handling
		if (this.errorMessage.length !== 0) {
			console.log(this.errorMessage);
			this.error = true;
		} else {
			this.error = false;
			this.queLength = this.instQue.length;
		}
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
			this.errorMessage[idx] = "Needs to be on form: label: (pred) type ...";
			return false;
		}


		// Append rest of line to inst
		regEx = getRegEx(type);
		line = line.split(type)[1].trim();
		regExMatch = line.match(regEx);

		if (regExMatch === null) {
			this.errorMessage[idx] = "Missing operators.";
			return false;
		}
		inst = inst.concat(regExMatch.slice(1,regExMatch.length)); 
		this.instQue[idx] = inst;
		this.binary[idx] = this.cpu.getBinary(inst);
		return true;
	}
	

}

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
 * @param 	{array} editor 			- User input editor 
 * @returns {array}	editorLines 	- 
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