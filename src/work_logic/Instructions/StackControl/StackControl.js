import { compile_reg, compile_imm } from './compilers'

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
     */
	constructor({ name, pred, op, imm }) {
		this.name = name;
		this.pred = pred;
		this.type = type;
		this.ra = ra;
		this.rs = rs;
		this.imm = toUint32(imm);
		this.binary = compile_reg(pred, type, ra, rs, imm);
	}

}
