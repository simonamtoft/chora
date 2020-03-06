import LoadTyped from "./LoadTyped";
import { toInt32 } from "../../../helper";

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
    execute({ reg, dc }) {
        reg[this.rd] = toInt32(dc[reg[this.ra] + (this.imm << 1)] & 0xFFFF); 
    }

}

export default Lhc;
