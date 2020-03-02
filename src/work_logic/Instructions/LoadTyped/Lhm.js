import LoadTyped from "./LoadTyped";
import { toInt32 } from "../../../helper";

/** 
 * Lhm instruction class. 
 * @extends LoadTyped
 * @category LoadTyped
 */
class Lhm extends LoadTyped{
    /**
     * Create Lhm instruction.
     * @param {Object}          fields      - Fields to set 
     * @param {string|number}   fields.pred - Instruction predicate
     * @param {string}          fields.rd   - Destination register
     * @param {string}          fields.ra  	- First source register
     * @param {string}   		fields.type - Second operand. Can be a second source register or immediate value.
	 * @param {number}			fields.imm	- Immediate value 
     */
    constructor({ pred, rd, ra, imm }) {
		super({name: "lhm", pred, rd, ra, type: 0b001111, imm});
    }

    /**
     * Executes the instruction
     * @param {Object}                  state        - Processor state
     * @param {Object.<string, number>} state.reg    - Registers
     */
    execute({ reg, gm }) {
        reg[this.rd] = toInt32(gm[reg[this.ra] + (this.Imm << 1)] & 0xFFFF); 
    }
}

export default Lhm;
