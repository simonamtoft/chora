import LoadTyped from "./LoadTyped";
import { toUint32 } from "../../../helper";

/** 
 * Lbul instruction class. 
 * @extends LoadTyped
 * @category LoadTyped
 */
class Lbul extends LoadTyped{
    /**
     * Create Lbul instruction.
     * @param {Object}          fields      - Fields to set 
     * @param {string|number}   fields.pred - Instruction predicate
     * @param {string}          fields.rd   - Destination register
     * @param {string}          fields.ra  	- First source register
	   * @param {number}			fields.imm	- Immediate value 
     */
    constructor({ pred, rd, ra, imm }) {
		super({name: "lbul", pred, rd, ra, type: 0b10001, imm});
    }

    /**
     * Executes the instruction
     * @param {Object}                  state        - Processor state
     * @param {Object.<string, number>} state.reg    - Registers
     */
    execute({ reg, lm }) {
        reg[this.rd] = toUint32(lm[reg[this.ra] + this.imm] & 0xFF); 
    }
}

export default Lbul;
