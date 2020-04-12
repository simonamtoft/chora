import LoadTyped from "./LoadTyped";

/** 
 * Lws instruction class. 
 * @extends LoadTyped
 * @category LoadTyped
 */
class Lws extends LoadTyped {
	/**
     * Create Lws instruction.
     * @param {Object}          fields      - Fields to set 
     * @param {string|number}   fields.pred - Instruction predicate
     * @param {string}          fields.rd   - Destination register
     * @param {string}          fields.ra  	- First source register
	 * @param {number}			fields.imm	- Immediate value 
     */
	constructor({ pred, rd, ra, imm }) {
		super({name: "lws", pred, rd, ra, type: 0b00000, imm});
	}

	/**
     * Executes the instruction
     * @param {Object}                  state        - Processor state
     * @param {Object.<string, number>} state.reg    - Registers
     */
	execute({ reg, mem }) {
		let address = reg[this.ra] + (this.imm << 2);
		let hh = mem[reg["s6"] + address + 0];
		let hl = mem[reg["s6"] + address + 1];
		let lh = mem[reg["s6"] + address + 2];
		let ll = mem[reg["s6"] + address + 3];

		reg[this.rd] = (hh << 24) | (hl << 16) | (lh << 8) | ll;
	}
}

export default Lws;
