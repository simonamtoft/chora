import { compile_reg, compile_imm } from "./compilers";

/** 
 * Represents a StackControl instruction. Sets common fields. 
 */
class StackControl {
	/**
     * Create base instruction.
     * @param {Object}          fields      - Fields to set 
     * @param {string}          fields.name - Name of instruction
     * @param {string|number}   fields.pred - Instruction predicate
     * @param {string}          fields.op   - Type of control
	 * @param {string}          fields.s1   - Either source register or immediate value
     */
	constructor({ name, pred, op, s1 }) {
		this.type = isNaN(s1) ? "r" : "i";
		this.name = name;
		this.pred = pred;
		this.op = op;
		this.s1 = s1;

		if (this.type === "r") {
			this.binary = compile_reg(pred, op, s1);
		} else {
			this.binary = compile_imm(pred, op, s1);
		}
	}
}

export default StackControl;
