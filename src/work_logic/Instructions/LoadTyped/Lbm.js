import LoadTyped from "./LoadTyped";

/** 
 * Lbm instruction class. 
 * @extends LoadTyped
 * @category LoadTyped
 */
class Lbm extends LoadTyped{
    /**
     * Create Lbm instruction.
     * @param {Object}          fields      - Fields to set 
     * @param {string|number}   fields.pred - Instruction predicate
     * @param {string}          fields.rd   - Destination register
     * @param {string}          fields.ra  	- First source register
	   * @param {number}			fields.imm	- Immediate value 
     */
    constructor({ pred, rd, ra, imm }) {
		super({name: "lbm", pred, rd, ra, type: 0b01011, imm});
    }

    /**
     * Executes the instruction
     * @param {Object}                  state        - Processor state
     * @param {Object.<string, number>} state.reg    - Registers
     */
    execute({ reg, gm }) {
        reg[this.rd] = ((gm[reg[this.ra] + this.imm]) << 24) >> 24; 
    }

}

export default Lbm;
