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
				this.parseLine(line, idx);
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

	parseLine(line, idx) {
		let inst = parseLineToInst(line);
		let types = [
			"add", "addi", "addl", "sub", "subi", "subl", "xor", "xori", "xorl", "sl", "sli", "sll",
			"sr", "sri", "srl", "sra", "srai", "sral", "nor", "norl", "shadd", "shadd2", "btest", "btesti",
			"cmpeq", "cmpeqi", "cmple", "cmplei", "cmplt", "cmplti", "cmpneq", "cmpneqi", "cmpule", "cmpulei",
			"cmpult", "cmpulti", "lbc", "lbl", "lbm", "lbs", "lbuc", "lbul", "lbum", "lbus", "lhc", "lhl", 
			"lhm", "lhs", "lhuc", "lhul", "lhum", "lhus", "lwc", "lwl", "lwm", "lws", "mul", "mulu", "pand",
			"por", "pxor", "sbc", "sbl", "sbm", "sbs", "shc", "shl", "shm", "shs", "swc", "swl", "swm", "sws",
			"bcopy", "mfs", "mts", // Missing control-flow and StackControl
		];

		// Check if the instruction type is at spot 2
		let hasLabel = types.includes(inst[1]);
		if (hasLabel) {
			this.labels[`${inst[0]}`] = idx;
			this.instQue[idx] = inst.slice(1, 5);
		} else {
			this.instQue[idx] = inst;
		}
		this.binary[idx] = this.cpu.getBinary(this.instQue[idx]);
	}
}

// Check if line is a comment
const isComment = (line) => {
	let parsedInst = parseLineToInst(line); 

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
const parseLineToInst = (line) => {
	line = line.trim().replace(/[=+\[\]:]/g, "").replace("#", "# "); 
	line = line.split(/[ 	,]+/);
	return line;
}

export default Assembler;
