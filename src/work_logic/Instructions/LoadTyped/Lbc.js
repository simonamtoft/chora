import LoadTyped from "./LoadTyped";

/** 
 * Lbc instruction class. 
 * @extends LoadTyped
 * @category LoadTyped
 */
class Lbc extends LoadTyped {
    /**
     * Create Lbc instruction.
     * @param {Object}          fields      - Fields to set 
     * @param {string|number}   fields.pred - Instruction predicate
     * @param {string}          fields.rd   - Destination register
     * @param {string}          fields.ra  	- First source register
     * @param {string}   		fields.type - Second operand. Can be a second source register or immediate value.
     * @param {number}			fields.imm	- Immediate value 
     */
    constructor({ pred, rd, ra, imm }) {
        super({ name: "lbc", pred, rd, ra, type: 0b01010, imm });
    }

    /**
     * Executes the instruction
     * @param {Object}                  state        - Processor state
     * @param {Object.<string, number>} state.reg    - Registers
     */
    execute({ reg, mem }) {
        reg[this.rd] = (mem[reg[this.ra] + this.imm] << 24) >> 24;
    }
}

export default Lbc;
