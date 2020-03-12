import CPU from "./CPU";

class Assembler {
	constructor() {
		this.instQue = [];
		this.binary = [];
		this.labels = {};
		this.queLength = 0;
		this.cpu = new CPU();
	}

	run(editor) {
		let lineCount = editor.split(/\r\n|\r|\n/).length;
		let line, idx, commentCount = 0;
		editor = editor.split("\n");

		for (let i = 0; i < lineCount; i++) {
			line = editor[i];
			idx = i-commentCount

			if (!isComment(line)) {
				this.parseInst(line, idx);
				this.binary[idx] = this.cpu.getBinary(this.instQue[idx]);
			} else {
				commentCount += 1;
			}
		}
		this.queLength = this.instQue.length;
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
		this.binary = [];
		this.labels = {};
		this.queLength = 0;
	}

	parseInst(line, idx) {
		let parsedLine = parseLine(line);
		let instructions = ["add", "addi", "addl", "sub", "xor"];
		let isInst = instructions.includes(parsedLine[1])

		if (isInst) {
			this.labels[`${parsedLine[0]}`] = idx;
			this.instQue[idx] = parsedLine.slice(1, 5);
		} else {
			this.instQue[idx] = parsedLine;
		}
	}
}

// Check if line is a comment
const isComment = (line) => {
	let parsedInst = parseLine(line); 

	if (parsedInst[0] === "#") {
		return true;
	}
	return false;
}

/**
 *  
 * @param {string} 	line 					- One line from the user editor
 * @returns {array}	
 */
const parseLine = (line) => {
	line = line.trim().replace(/[=+\[\]:]/g, "").replace("#", "# "); 
	line = line.split(/[ 	,]+/);
	return line;
}

export default Assembler;
