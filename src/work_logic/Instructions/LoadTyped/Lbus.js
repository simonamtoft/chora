import LoadTyped from "./LoadTyped";
import { toUint32 } from "../../../helper";

/** 
 * Lbus instruction class. 
 * @extends LoadTyped
 * @category LoadTyped
 */
class Lbus extends LoadTyped{
    /**
     * Create Lbus instruction.
     * @param {Object}          fields      - Fields to set 
     * @param {string|number}   fields.pred - Instruction predicate
     * @param {string}          fields.rd   - Destination register
     * @param {string}          fields.ra  	- First source register
	   * @param {number}			fields.imm	- Immediate value 
     */
    constructor({ pred, rd, ra, imm }) {
		super({name: "lbus", pred, rd, ra, type: 0b10000, imm});
    }

    /**
     * Executes the instruction
     * @param {Object}                  state        - Processor state
     * @param {Object.<string, number>} state.reg    - Registers
     */
    execute({ reg, sc }) {
        reg[this.rd] = toUint32(sc[reg[this.ra] + this.imm] & 0xFF); 
    }
}

export default Lbus;
