import LoadTyped from "./LoadTyped";

/** 
 * Lbum instruction class. 
 * @extends LoadTyped
 * @category LoadTyped
 */
class Lbum extends LoadTyped{
    /**
     * Create Lbum instruction.
     * @param {Object}          fields      - Fields to set 
     * @param {string|number}   fields.pred - Instruction predicate
     * @param {string}          fields.rd   - Destination register
     * @param {string}          fields.ra  	- First source register
	   * @param {number}			fields.imm	- Immediate value 
     */
    constructor({ pred, rd, ra, imm }) {
		super({name: "lbum", pred, rd, ra, type: 0b10011, imm});
    }

    /**
     * Executes the instruction
     * @param {Object}                  state        - Processor state
     * @param {Object.<string, number>} state.reg    - Registers
     */
    execute({ reg, gm }) {
        reg[this.rd] = gm[reg[this.ra] + this.imm] & 0xFF; 
    }
}

export default Lbum;
