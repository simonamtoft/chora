import { compile_reg } from "./compilers";

/** 
 * Represents a Predicate instruction. Sets common fields. 
 */
class Predicate {
	/**
     * Create base instruction.
     * @param {Object}          fields      - Fields to set 
     * @param {string}          fields.name - Name of instruction
     * @param {string|number}   fields.pred - Instruction predicate
	 * @param {string}			fields.pd 	- Destination register
     * @param {string}          fields.rs1  - First source register
     * @param {string}          fields.rs2  - Second source register
     * @param {number}          fields.func - Instruction function
     */
	constructor({ name, pred, pd, ps1, ps2, func }) {
		this.name = name;
		this.pred = pred;
		this.pd = pd;
		this.neg1 = ps1[0] === "!";
		this.neg2 = ps2[0] === "!";
		this.ps1 = ps1.replace("!", "");
		this.ps2 = ps2.replace("!", "");
		this.func = func; 
		this.binary = compile_reg(pred, pd, ps1, ps2, func);
	}
    
	execute(){
		console.error("Missing execute handler for", this);
	}

	toString(){
		return `${this.pred ? `(${this.pred&0b1000 ? "!" : ""}p${this.pred&0b0111}) ` : ""}${this.name} ${this.pd} = ${this.neg1 ? "!" : ""}${this.ps1}, ${this.neg2 ? "!" : ""}${this.ps2}`;
	}
}

export default Predicate;
