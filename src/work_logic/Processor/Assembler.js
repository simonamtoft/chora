import CPU from "./CPU";

class Assembler {
	constructor() {
		this.instQue = [];
		this.binary = [];
		this.queLength = 0;
		this.cpu = new CPU();
	}

	run(editor) {
		let lineCount = editor.split(/\r\n|\r|\n/).length;
		let line, commentCount = 0;
		editor = editor.split("\n");

		// Generate instruction que
		for (let i = 0; i < lineCount; i++) {
			line = editor[i];

			if (!isComment(line)) {
				this.instQue[i-commentCount] = parseInst(line);
			} else {
				commentCount += 1;
			}
		}
		this.queLength = this.instQue.length;
		
		// Generate binaries
		for (let i = 0; i < this.queLength; i++) {
			this.binary[i] = this.cpu.getBinary(this.instQue[i]);
		}
	}

	/**
	 * Check if there is an instruction to be executed
	 * @param {string} 		que 		- All instructions from editor
	 * @param {number}		queLength 	- Number of instructions in total
	 */ 
	checkQue(instCount) {
		if (this.queLength === 0) {
            console.log("Error: Instruction queue is empty.");
            return false;
        } else if (instCount === this.queLength) {
            console.log("Error: All instructions executed.");
            return false;
		} 
		return true;
	}

	reset() {
		this.instQue = [];
		this.queLength = 0;
	}
}

// Check if line is a comment
const isComment = (line) => {
	let parsedInst = parseInst(line); 

	if (parsedInst[0] === "#") {
		return true;
	}
	return false;
}

const parseInst = (inst) => {
	let parsedInst = inst.trim();
	// Replace special characters. But keep comment tag to skip commented out lines.
	// eslint-disable-next-line
	parsedInst = parsedInst.replace(/[=+\[\]]/g, "").replace("#", "# "); 
	// eslint-disable-next-line
	let [type, des, s1, s2] = parsedInst.split(/[ 	,]+/);
	return [type, des, s1, s2];
}

export default Assembler;
