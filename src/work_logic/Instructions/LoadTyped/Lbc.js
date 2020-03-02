import LoadTyped from "./LoadTyped";
import { toInt32 } from "../../../helper";

/** 
 * Lbc instruction class. 
 * @extends LoadTyped
 * @category LoadTyped
 */
class Lbc extends LoadTyped{
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
        super({name: "lbc", pred, rd, ra, type: 0b010110, imm});
    }

    /**
     * Executes the instruction
     * @param {Object}                  state        - Processor state
     * @param {Object.<string, number>} state.reg    - Registers
     */
    execute({ reg, dc }) {
        reg[this.rd] = toInt32(dc[reg[this.ra] + this.Imm] & 0xFF); 
    }
}

export default Lbc;
