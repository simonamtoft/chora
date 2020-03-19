import CPU from "./CPU";
import { parseLineToInst, checkFields, instTypes, checkSyntax} from "./AssemblerHelper";

class Assembler {
	constructor() {
		this.error = false;
		this.feedback = [];
		this.instQue = [];
		this.binary = [];
		this.labels = {};
		this.queLength = 0;
		this.cpu = new CPU();
	}

	reset() {
		this.error = false;
		this.feedback = [];
		this.instQue = [];
		this.binary = [];
		this.labels = {};
		this.queLength = 0;
		this.cpu.reset();
	}

	run(editor) {
		let lineCount, line, parsedCount = 0;
		editor = trimEditor(editor);
		lineCount = editor.length;

		for (let i = 0; i < lineCount; i++) {
			line = editor[i];

			if (this.parse(line, i)) {
				this.parseLine(line, parsedCount);
				parsedCount += 1;
			}
		}

		this.queLength = this.instQue.length;

		// Check if any errors
		this.checkErrors();
	}
	
	checkErrors() {
		if (this.feedback.length !== 0) {	
			this.error = true;
			console.log(this.feedback);
		} else {
			this.error = false;
		}
	}

	parse(line, idx) {
		let inst = parseLineToInst(line);
		let feedback;
		
		// Check type
		feedback = checkType(getType(line));

		// Checks if all fields are correctly put in as registers and/or immediates
		feedback += checkFields(inst);

		// Check that special characters are used correctly if all fields are ok
		if (feedback === "") {
			feedback += checkSyntax(line, inst);
		}

		// Return 
		if (feedback === "") {
			return true;
		}
		this.feedback[idx] = feedback;
		return false;
	}

	parseLine(line, idx) {
		let inst = parseLineToInst(line);
		let hasLabel = instTypes.includes(inst[1]); // Assumes label if field 1 is a type
		
		if (hasLabel) {
			this.labels[`${inst[0]}`] = idx;
			this.instQue[idx] = inst.slice(1, 5);
		} else {
			this.instQue[idx] = inst;
		}
		this.binary[idx] = this.cpu.getBinary(this.instQue[idx]);
	}

	
}
export default Assembler;



/**
 * Removes empty lines and comments
 * @param {array} editor - User input editor 
 */
const trimEditor = (editor) => {
	let line, idx, editorLines = [], emptyCount = 0;
	let lineCount = editor.split(/\r\n|\r|\n/).length;
	editor = editor.split("\n");

	for (let i = 0; i < lineCount; i++) {
		line = editor[i].trim().replace("#", "# ");		// Trim line

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

/**
 * Checks if the inst type field is an implemented patmos instruction type. 
 * @param 	{array} 	inst 		- A parsed instruction from the editor.
 * @returns {string}	feedback 	- Error message.
 */
const checkType = (type) => {
	let feedback = "";

	if (!instTypes.includes(type)) {
		feedback = `Type "${type}" not recognized.\n`;
	}
	return feedback;
};


const getType = (line) => {
	line = line.trim().match(
		/^(?!#)(?:(\w+):\s*)?(?:\((!?)(p\d)\)\s+)?(\w+)\s+/i
	);
	if (line === null) {
		return "";
	}
	return line[4];
};
