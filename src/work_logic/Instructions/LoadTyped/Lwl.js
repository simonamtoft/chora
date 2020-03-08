import LoadTyped from "./LoadTyped";

/** 
 * Lwl instruction class. 
 * @extends LoadTyped
 * @category LoadTyped
 */
class Lwl extends LoadTyped{
    /**
     * Create Lwl instruction.
     * @param {Object}          fields      - Fields to set 
     * @param {string|number}   fields.pred - Instruction predicate
     * @param {string}          fields.rd   - Destination register
     * @param {string}          fields.ra  	- First source register
	 * @param {number}			fields.imm	- Immediate value 
     */
    constructor({ pred, rd, ra, imm }) {
        super({name: "lwl", pred, rd, ra, type: 0b00001, imm});
    }

    /**
     * Executes the instruction
     * @param {Object}                  state        - Processor state
     * @param {Object.<string, number>} state.reg    - Registers
     */
    execute({ reg, lm }) {
        let hh = lm[reg[this.ra] + (this.imm << 2) + 3];
        let hl = lm[reg[this.ra] + (this.imm << 2) + 2];
        let lh = lm[reg[this.ra] + (this.imm << 2) + 1];
        let ll = lm[reg[this.ra] + (this.imm << 2)];

        reg[this.rd] = (hh << 24) | (hl << 16) | (lh << 8) | ll;
    }
}

export default Lwl;
