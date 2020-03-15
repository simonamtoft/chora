import LoadTyped from "./LoadTyped";

/** 
 * Lbuc instruction class. 
 * @extends LoadTyped
 * @category LoadTyped
 */
class Lbuc extends LoadTyped{
	/**
     * Create Lbuc instruction.
     * @param {Object}          fields      - Fields to set 
     * @param {string|number}   fields.pred - Instruction predicate
     * @param {string}          fields.rd   - Destination register
     * @param {string}          fields.ra  	- First source register
	   * @param {number}			fields.imm	- Immediate value 
     */
	constructor({ pred, rd, ra, imm }) {
		super({name: "lbuc", pred, rd, ra, type: 0b10010, imm});
	}

	/**
     * Executes the instruction
     * @param {Object}                  state        - Processor state
     * @param {Object.<string, number>} state.reg    - Registers
     */
	execute({ reg, mem }) {
		reg[this.rd] = mem[reg[this.ra] + this.imm] & 0xFF; 
	}
}

export default Lbuc;
