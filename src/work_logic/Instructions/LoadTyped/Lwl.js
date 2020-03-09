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
		let address = reg[this.ra] + (this.imm << 2);
        let hh = lm[address + 3];
        let hl = lm[address + 2];
        let lh = lm[address + 1];
        let ll = lm[address];

        reg[this.rd] = (hh << 24) | (hl << 16) | (lh << 8) | ll;
    }
}

export default Lwl;
