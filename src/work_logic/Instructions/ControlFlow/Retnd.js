import ControlFlow from "./ControlFlow";

/** 
 * Retnd instruction class. 
 * @extends ControlFlow
 * @category ControlFlow
 */
class Retnd extends ControlFlow {
	/**
     * Create Retnd instruction.
     * @param {Object}          fields      - Fields to set
     * @param {string|number}   fields.pred - Predicate
     * @param {string}          fields.rd   - Destination register
     * @param {string}          fields.rs1  - First source register
     * @param {string|number}   fields.op2  - Second operand. Can be a second source register or immediate value.
     */
	constructor({ pred, s1, s2 }) {
		super({ name: "retnd", d: 0, op: 0b00, pred, s1, s2 });
	}

	/**
     * Executes the instruction
     * @param {Object}                  state           - Processor state
     * @param {Object.<string, number>} state.reg       - Registers
     * @param {Object}                  state.cpu       - Object containing CPU internals such as PC.
     * @param {number}                  state.cpu.base  - Base address
     * @param {number}                  state.cpu.pc    - Program counter
     */
	execute({ reg, cpu }) {
		//srb s7, sro s8
		cpu.base = reg.s7;
		cpu.pc = reg.s8; //should be offset(sxb) + sxo, but as we don't have cache.
	}
}

export default Retnd;