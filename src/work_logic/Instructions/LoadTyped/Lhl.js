import LoadTyped from "./LoadTyped";

/** 
 * Lhl instruction class. 
 * @extends LoadTyped
 * @category LoadTyped
 */
class Lhl extends LoadTyped{
    /**
     * Create Lhl instruction.
     * @param {Object}          fields      - Fields to set 
     * @param {string|number}   fields.pred - Instruction predicate
     * @param {string}          fields.rd   - Destination register
     * @param {string}          fields.ra  	- First source register
	 * @param {number}			fields.imm	- Immediate value 
     */
    constructor({ pred, rd, ra, imm }) {
        super({name: "lhl", pred, rd, ra, type: 0b00101, imm});
    }

    /**
     * Executes the instruction
     * @param {Object}                  state        - Processor state
     * @param {Object.<string, number>} state.reg    - Registers
     */
    execute({ reg, lm }) {
        let hi = lm[reg[this.ra] + (this.imm << 1) + 1];
        let lo = lm[reg[this.ra] + (this.imm << 1)];

        reg[this.rd] = (((hi << 8) | lo) << 16) >> 16; 
    }
}

export default Lhl;
