import LoadTyped from "./LoadTyped";
import { toInt32 } from "../../../helper";

/** 
 * Lhs instruction class. 
 * @extends LoadTyped
 * @category LoadTyped
 */
class Lhs extends LoadTyped {
  /**
   * Create Lhs instruction.
   * @param {Object}          fields      - Fields to set 
   * @param {string|number}   fields.pred - Instruction predicate
   * @param {string}          fields.rd   - Destination register
   * @param {string}          fields.ra  	- First source register
   * @param {number}			fields.imm	- Immediate value 
   */
  constructor({ pred, rd, ra, imm }) {
    super({ name: "lhs", pred, rd, ra, type: 0b00100, imm });
  }

  /**
   * Executes the instruction
   * @param {Object}                  state        - Processor state
   * @param {Object.<string, number>} state.reg    - Registers
   */
  execute({ reg, sc }) {
    reg[this.rd] = toInt32(sc[reg[this.ra] + (this.imm << 1)] & 0xFFFF);
  }
}

export default Lhs;
