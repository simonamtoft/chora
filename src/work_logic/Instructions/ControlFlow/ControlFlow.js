import { compile_reg, compile_imm } from "./compilers";

/** 
 * Represents a ControlFlow instruction. Sets common fields. 
 */
class ControlFLow {
	/**
     * Create base instruction.
     * @param {Object}          fields      - Fields to set 
     * @param {string}          fields.name - Name of instruction
     * @param {string|number}   fields.pred - Instruction predicate
     * @param {string}          fields.op   - Type of control
	 * @param {string}          fields.s1   - Either source register or immediate value
	 * @param {string}          fields.s2   - Source register 2.
     */
	constructor({ name, pred, d, op, s1, s2 }) {
		this.type = isNaN(s1) ? "r" : "i";
		this.name = name;
		this.pred = pred;
		this.d = d;
		this.op = op;
		this.s1 = s1;
		this.s2 = s2;

	}
}

export default ControlFLow;
