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
    execute({ reg, sc }) {
        reg[this.rd] = sc[reg[this.ra] + (this.imm << 2)]; 
    }
}

export default Lws;
