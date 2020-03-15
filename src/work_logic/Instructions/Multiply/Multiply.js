import { compile_reg } from "./compilers";

/** 
 * Represents a Multiply instruction. Sets common fields. 
 */
class Multiply {
	/**
     * Create base instruction.
     * @param {Object}          fields      - Fields to set 
     * @param {string}          fields.name - Name of instruction
     * @param {string|number}   fields.pred - Instruction predicate
     * @param {string}          fields.rs1  - First source register
     * @param {string}          fields.rs2  - Second source register
     * @param {number}          fields.func - Instruction function
     */
	constructor({ name, pred, rs1, rs2, func }) {
		this.name = name;
		this.pred = pred;
		this.rs1 = rs1;
		this.rs2 = rs2;
		this.func = func; 
		this.binary = compile_reg(pred, rs1, rs2, func);
	}
    
	execute(){
		console.error("Missing execute handler for", this);
	}
}
export default Multiply;