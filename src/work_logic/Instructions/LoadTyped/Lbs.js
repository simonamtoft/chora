import LoadTyped from "./LoadTyped";
import { toInt32 } from "../../../helper";

/** 
 * Lbs instruction class. 
 * @extends LoadTyped
 * @category LoadTyped
 */
class Lbs extends LoadTyped{
    /**
     * Create Lbs instruction.
     * @param {Object}          fields      - Fields to set 
     * @param {string|number}   fields.pred - Instruction predicate
     * @param {string}          fields.rd   - Destination register
     * @param {string}          fields.ra  	- First source register
	   * @param {number}			fields.imm	- Immediate value 
     */
    constructor({ pred, rd, ra, imm }) {
		super({name: "lbs", pred, rd, ra, type: 0b01000, imm});
    }

    /**
     * Executes the instruction
     * @param {Object}                  state        - Processor state
     * @param {Object.<string, number>} state.reg    - Registers
     */
    execute({ reg, sc }) {
        reg[this.rd] = toInt32(sc[reg[this.ra] + this.imm] & 0xFF); 
    }

}

export default Lbs;
