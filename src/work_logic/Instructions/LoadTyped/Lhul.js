import LoadTyped from "./LoadTyped";
import { toUint32 } from "../../../helper";

/** 
 * Lhul instruction class. 
 * @extends LoadTyped
 * @category LoadTyped
 */
class Lhul extends LoadTyped{
    /**
     * Create Lhul instruction.
     * @param {Object}          fields      - Fields to set 
     * @param {string|number}   fields.pred - Instruction predicate
     * @param {string}          fields.rd   - Destination register
     * @param {string}          fields.ra  	- First source register
     * @param {string}   		fields.type - Second operand. Can be a second source register or immediate value.
	 * @param {number}			fields.imm	- Immediate value 
     */
    constructor({ pred, rd, ra, imm }) {
		super({name: "lhul", pred, rd, ra, type: 0b011101, imm});
    }

    /**
     * Executes the instruction
     * @param {Object}                  state        - Processor state
     * @param {Object.<string, number>} state.reg    - Registers
     */
    execute({ reg, lm }) {
        reg[this.rd] = toUint32(lm[reg[this.ra] + (this.Imm << 1)] & 0xFFFF); 
    }
}

export default Lhul;
