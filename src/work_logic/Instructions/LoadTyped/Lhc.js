import LoadTyped from "./LoadTyped";

/** 
 * Lhc instruction class. 
 * @extends LoadTyped
 * @category LoadTyped
 */
class Lhc extends LoadTyped{
    /**
     * Create Lhc instruction.
     * @param {Object}          fields      - Fields to set 
     * @param {string|number}   fields.pred - Instruction predicate
     * @param {string}          fields.rd   - Destination register
     * @param {string}          fields.ra  	- First source register
	   * @param {number}			fields.imm	- Immediate value 
     */
    constructor({ pred, rd, ra, imm }) {
        super({name: "lhc", pred, rd, ra, type: 0b00110, imm});
    }

    /**
     * Executes the instruction
     * @param {Object}                  state        - Processor state
     * @param {Object.<string, number>} state.reg    - Registers
     */
    execute({ reg, mem }) {
        let address = reg[this.ra] + (this.imm << 1);
        let hi = mem[address + 1];
        let lo = mem[address];

        reg[this.rd] = (((hi << 8) | lo) << 16) >> 16; 
    }

}

export default Lhc;
