import ControlFlow from "./ControlFlow";

/** 
 * Br instruction class. 
 * @extends ControlFlow
 * @category ControlFlow
 */
class Brcf extends ControlFlow {
	/**
     * Create Brcf instruction.
     * @param {Object}          fields      - Fields to set
     * @param {string|number}   fields.pred - Predicate
     * @param {string}          fields.rd   - Destination register
     * @param {string}          fields.rs1  - First source register
     * @param {string|number}   fields.op2  - Second operand. Can be a second source register or immediate value.
     */
	constructor({ pred, s1, s2 }) {
		super({ name: "brcf", d: 1, op: 0b10, pred, s1, s2 });
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
		// To-Do: figure out vodoo way of executing next 2 instructions before jumping.
		let addr = this.type === "immediate" ? (Number(this.s1) >> 21) << 23 : reg[this.s1];
		cpu.base = addr;
		cpu.pc = addr;
	}
}

export default Brcf;