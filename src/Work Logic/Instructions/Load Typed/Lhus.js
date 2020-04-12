import LoadTyped from "./LoadTyped";

/** 
 * Lhus instruction class. 
 * @extends LoadTyped
 * @category LoadTyped
 */
class Lhus extends LoadTyped {
	/**
   * Create Lhus instruction.
   * @param {Object}          fields      - Fields to set 
   * @param {string|number}   fields.pred - Instruction predicate
   * @param {string}          fields.rd   - Destination register
   * @param {string}          fields.ra  	- First source register
   * @param {number}			fields.imm	- Immediate value 
   */
	constructor({ pred, rd, ra, imm }) {
		super({ name: "lhus", pred, rd, ra, type: 0b01100, imm });
	}

	/**
   * Executes the instruction
   * @param {Object}                  state        - Processor state
   * @param {Object.<string, number>} state.reg    - Registers
   */
	execute({ reg, mem }) {
		let address = reg[this.ra] + (this.imm << 1);
		let hi = mem[reg["s6"] + address + 0];
		let lo = mem[reg["s6"] + address + 1];

		reg[this.rd] = (hi << 8) | lo;
	}
}

export default Lhus;
