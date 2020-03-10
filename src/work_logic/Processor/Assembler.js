
class Assembler {
	constructor() {
		this.instQue = [];
		this.queLength = 0;
	}

	generateInstQue(editor) {
		let instQue = [];
		let queLength = editor.split(/\r\n|\r|\n/).length;
		let inst;
	
		for (let i = 0; i < queLength; i++) {
			inst = editor.split("\n")[i];
			instQue[i] = parseInst(inst);
		} 
	
		this.instQue = instQue;
		this.queLength = instQue.length;
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
}

const parseInst = (inst) => {
	let parsedInst = inst.trim();
	parsedInst = parsedInst.replace("=", "").replace("[", "").replace("]", "").replace("+", "");
	// eslint-disable-next-line
	let [type, des, s1, s2] = parsedInst.split(/[ 	,]+/);
	return [type, des, s1, s2];
}

export default Assembler;
