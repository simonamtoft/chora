import ControlFlow from "./ControlFlow";

/** 
 * Ret instruction class. 
 * @extends ControlFlow
 * @category ControlFlow
 */
class Ret extends ControlFlow {
	/**
     * Create Ret instruction.
     * @param {Object}          fields      - Fields to set
     * @param {string|number}   fields.pred - Predicate
     * @param {string}          fields.rd   - Destination register
     * @param {string}          fields.rs1  - First source register
     * @param {string|number}   fields.op2  - Second operand. Can be a second source register or immediate value.
     */
	constructor({ pred, s1, s2 }) {
		super({ name: "ret", d: 1, op: 0b00, pred, s1, s2 });
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
		// To-Do: figure out voodoo
		//srb s7, sro s8
		cpu.base = reg.s7;
		cpu.pc = reg.s8 + 4; //should be offset(srb) + sro, but as we don't have cache. Also +4 is to set it to the next instruction.
	}
}

export default Ret;