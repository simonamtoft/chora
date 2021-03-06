import { compile_reg, compile_imm } from "./compilers";

/** 
 * Represents a Compare instruction. Sets common fields. 
 */
class Compare {
	/**
     * Create base instruction.
     * @param {Object}          fields      - Fields to set 
     * @param {string}          fields.name - Name of instruction
     * @param {number}          fields.func - Instruction function
     * @param {string|number}   fields.pred - Instruction predicate
     * @param {string}          fields.pd   - Destination register
     * @param {string}          fields.rs1  - First source register
     * @param {string|number}   fields.op2  - Second operand. Can be a second source register or immediate value.
     */
	constructor({ name, pred, pd, rs1, op2, func }) {
		this.type = isNaN(op2) ? "r" : "i";
		this.pred = pred;
		this.pd = pd;
		this.rs1 = rs1;
		this.op2 = op2;
		this.name = name;
		this.func = func;

		switch (this.type) {
			case "r":
				this.binary = compile_reg(pred, pd, rs1, op2, func);
				break;
			case "i":
				this.op2 &= 0x1F;
				this.binary = compile_imm(pred, pd, rs1, op2, func);
				break;
			default:
				throw new Error(`Unexpected type in ${this.name}`);
		}
	}
    
	execute(){
		throw new Error("Missing execute handler for", this);
	}
	toString(){
		return `${this.pred ? `(${this.pred&0b1000 ? "!" : ""}p${this.pred&0b0111}) ` : ""}${this.name} ${this.pd} = ${this.rs1}, ${this.op2}`;
	}
}

export default Compare;