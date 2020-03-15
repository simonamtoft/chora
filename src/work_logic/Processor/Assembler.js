import CPU from "./CPU";

const types = [
	"add", "addi", "addl", "sub", "subi", "subl", "xor", "xori", "xorl", "sl", "sli", "sll",
	"sr", "sri", "srl", "sra", "srai", "sral", "nor", "norl", "shadd", "shadd2", "btest", "btesti",
	"cmpeq", "cmpeqi", "cmple", "cmplei", "cmplt", "cmplti", "cmpneq", "cmpneqi", "cmpule", "cmpulei",
	"cmpult", "cmpulti", "lbc", "lbl", "lbm", "lbs", "lbuc", "lbul", "lbum", "lbus", "lhc", "lhl", 
	"lhm", "lhs", "lhuc", "lhul", "lhum", "lhus", "lwc", "lwl", "lwm", "lws", "mul", "mulu", "pand",
	"por", "pxor", "sbc", "sbl", "sbm", "sbs", "shc", "shl", "shm", "shs", "swc", "swl", "swm", "sws",
	"bcopy", "mfs", "mts", // Missing control-flow and StackControl
];
const regStr = [
	"r0", "r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8", "r9", "r10", 
	"r11", "r12", "r13", "r14", "r15", "r16", "r17", "r18", "r19", "r20", 
	"r21", "r22", "r23", "r24", "r25", "r26", "r27", "r28", "r29", "r30", "r31",
	"s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", 
	"s10", "s11", "s12", "s13", "s14", "s15",
	"p0", "p1", "p2", "p3", "p4", "p5", "p6", "p7"
]

class Assembler {
	constructor() {
		this.feedback = "";
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

			if (!isComment(line) & this.canParse(line)) {
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
		this.feedback = "";
		this.instQue = [];
		this.binary = [];
		this.labels = {};
		this.queLength = 0;
	}

	parseLine(line, idx) {
		let inst = parseLineToInst(line);

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

	canParse(line) {
		let inst = parseLineToInst(line);
		let parse = true;
		
		// Check type
		if (!types.includes(inst[0])) {
			console.log(`Type "${inst[0]}" not recognized.`);
			return false;
		}
		
		// Check if field 1 is reg
		if (!regStr.includes(inst[1])) {
			console.log(`Field "${inst[1]}" is not a register`);
			return false;
		}

		// Check if field 2 is reg
		if (!regStr.includes(inst[2])) {
			console.log(`Field "${inst[2]}" is not a register`);
			return false;
		}

		// Check if field 3 is reg/imm
		if (!(inst[0] === "Mul" | inst[0] === "Mulu")) {
			if (inst[3] === undefined) {
				console.log(`inst 3 undefined`);
				return false;
			} else {
				if (!regStr.includes(inst[3])) {
					if (isNaN(inst[3])) {
						console.log(`Field "${inst[3]}" is neither a register or immediate`);
						return false;
					} 
				}					
			}
		}
		return true;
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
