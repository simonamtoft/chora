import LoadTyped from "./LoadTyped";

/** 
 * Lhum instruction class. 
 * @extends LoadTyped
 * @category LoadTyped
 */
class Lhum extends LoadTyped {
    /**
   * Create Lhum instruction.
   * @param {Object}          fields      - Fields to set 
   * @param {string|number}   fields.pred - Instruction predicate
   * @param {string}          fields.rd   - Destination register
   * @param {string}          fields.ra  	- First source register
   * @param {number}			fields.imm	- Immediate value 
   */
    constructor({ pred, rd, ra, imm }) {
        super({ name: "lhum", pred, rd, ra, type: 0b01111, imm });
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

        reg[this.rd] = (hi << 8) | lo;
    }
}

export default Lhum;
