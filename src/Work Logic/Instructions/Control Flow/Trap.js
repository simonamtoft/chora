import ControlFlow from "./ControlFlow";

/** 
 * Trap instruction class. 
 * @extends ControlFlow
 * @category ControlFlow
 */
class Trap extends ControlFlow {
	/**
     * Create Trap instruction.
     * @param {Object}          fields      - Fields to set
     * @param {string|number}   fields.pred - Predicate
     * @param {string}          fields.rd   - Destination register
     * @param {string}          fields.rs1  - First source register
     * @param {string|number}   fields.op2  - Second operand. Can be a second source register or immediate value.
     */
	constructor({ pred, s1, s2 }) {
		super({ name: "trap", d: 0, op: 0b11, pred, s1, s2 });
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
		let addr = 0xf0010080 + this.s1;	//exception table base addr: 0xF0010080
		reg.s9 = cpu.base; 					// sxb
		reg.s10 = cpu.pc;					// sxo
		cpu.base = addr;
		cpu.pc = addr; 						// should be offset(addr) but as we have no cache...
	}
}

export default Trap;