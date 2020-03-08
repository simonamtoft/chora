import LoadTyped from "./LoadTyped";
import { toUint32 } from "../../../helper";

/** 
 * Lhum instruction class. 
 * @extends LoadTyped
 * @category LoadTyped
 */
class Lhum extends LoadTyped{
    /**
     * Create Lhum instruction.
     * @param {Object}          fields      - Fields to set 
     * @param {string|number}   fields.pred - Instruction predicate
     * @param {string}          fields.rd   - Destination register
     * @param {string}          fields.ra  	- First source register
	   * @param {number}			fields.imm	- Immediate value 
     */
    constructor({ pred, rd, ra, imm }) {
		super({name: "lhum", pred, rd, ra, type: 0b01111, imm});
    }

    /**
     * Executes the instruction
     * @param {Object}                  state        - Processor state
     * @param {Object.<string, number>} state.reg    - Registers
     */
    execute({ reg, gm }) {
        reg[this.rd] = toUint32(gm[reg[this.ra] + (this.imm << 1)] & 0xFFFF); 
    }
}

export default Lhum;
