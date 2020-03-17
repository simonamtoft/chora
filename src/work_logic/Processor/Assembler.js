import CPU from "./CPU";
import { parseLineToInst, checkFields, instTypes, checkSyntax, checkType} from "./AssemblerHelper";

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
		let lineCount = editor.split(/\r\n|\r|\n/).length;
		let line, idx, commentCount = 0;
		editor = editor.split("\n");

		for (let i = 0; i < lineCount; i++) {
			line = editor[i];
			idx = i-commentCount;

			if (this.parse(line, i)) {
				this.parseLine(line, idx);
			} else {
				commentCount += 1;
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

	parse(line, idx) {
		let inst = parseLineToInst(line);
		let feedback = "";

		// Check if comment
		if (inst[0] === "#") {
			return false;
		}
		
		// Check type
		feedback += checkType(inst);
		if (feedback === "newline") {
			return false;
		}

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
}

export default Assembler;
