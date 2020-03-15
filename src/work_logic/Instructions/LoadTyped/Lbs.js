import LoadTyped from "./LoadTyped";

/** 
 * Lbs instruction class. 
 * @extends LoadTyped
 * @category LoadTyped
 */
class Lbs extends LoadTyped {
	/**
	 * Create Lbs instruction.
	 * @param {Object}          fields      - Fields to set 
	 * @param {string|number}   fields.pred - Instruction predicate
	 * @param {string}          fields.rd   - Destination register
	 * @param {string}          fields.ra  	- First source register
	 * @param {number}			fields.imm	- Immediate value 
	 */
	constructor({ pred, rd, ra, imm }) {
		super({ name: "lbs", pred, rd, ra, type: 0b01000, imm });
	}

	/**
	 * Executes the instruction
	 * @param {Object}                  state        - Processor state
	 * @param {Object.<string, number>} state.reg    - Registers
	 */
	execute({ reg, mem }) {
		reg[this.rd] = (mem[reg["s6"] + reg[this.ra] + this.imm] << 24) >> 24;
	}

}

export default Lbs;
