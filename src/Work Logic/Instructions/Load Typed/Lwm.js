import LoadTyped from "./LoadTyped";

/** 
 * Lwm instruction class. 
 * @extends LoadTyped
 * @category LoadTyped
 */
class Lwm extends LoadTyped {
	/**
   * Create Lwm instruction.
   * @param {Object}          fields      - Fields to set 
   * @param {string|number}   fields.pred - Instruction predicate
   * @param {string}          fields.rd   - Destination register
   * @param {string}          fields.ra  	- First source register
   * @param {number}			fields.imm	- Immediate value 
   */
	constructor({ pred, rd, ra, imm }) {
		super({ name: "lwm", pred, rd, ra, type: 0b00011, imm });
	}

	/**
   * Executes the instruction
   * @param {Object}                  state        - Processor state
   * @param {Object.<string, number>} state.reg    - Registers
   */
	execute({ reg, mem }) {
		let address = reg[this.ra] + (this.imm << 2);
		let hh = mem[address + 3];
		let hl = mem[address + 2];
		let lh = mem[address + 1];
		let ll = mem[address];

		reg[this.rd] = (hh << 24) | (hl << 16) | (lh << 8) | ll;
	}
}

export default Lwm;
