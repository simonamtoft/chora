import LoadTyped from "./LoadTyped";

/** 
 * Lwc instruction class. 
 * @extends LoadTyped
 * @category LoadTyped
 */
class Lwc extends LoadTyped{
    /**
     * Create Lwc instruction.
     * @param {Object}          fields      - Fields to set 
     * @param {string|number}   fields.pred - Instruction predicate
     * @param {string}          fields.rd   - Destination register
     * @param {string}          fields.ra  	- First source register
	 * @param {number}			fields.imm	- Immediate value 
     */
    constructor({ pred, rd, ra, imm }) {
        super({name: "lwc", pred, rd, ra, type: 0b00010, imm});
    }

    /**
     * Executes the instruction
     * @param {Object}                  state        - Processor state
     * @param {Object.<string, number>} state.reg    - Registers
     */
    execute({ reg, dc }) {
        reg[this.rd] = dc[reg[this.ra] + (this.imm << 2)]; 
    }
}

export default Lwc;
