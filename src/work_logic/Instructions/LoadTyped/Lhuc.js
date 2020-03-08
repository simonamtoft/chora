import LoadTyped from "./LoadTyped";

/** 
 * Lhuc instruction class. 
 * @extends LoadTyped
 * @category LoadTyped
 */
class Lhuc extends LoadTyped {
  /**
   * Create Lhuc instruction.
   * @param {Object}          fields      - Fields to set 
   * @param {string|number}   fields.pred - Instruction predicate
   * @param {string}          fields.rd   - Destination register
   * @param {string}          fields.ra  	- First source register
   * @param {number}			fields.imm	- Immediate value 
   */
  constructor({ pred, rd, ra, imm }) {
    super({ name: "lhuc", pred, rd, ra, type: 0b01110, imm });
  }

  /**
   * Executes the instruction
   * @param {Object}                  state        - Processor state
   * @param {Object.<string, number>} state.reg    - Registers
   */
  execute({ reg, dc }) {
    let hi = dc[reg[this.ra] + (this.imm << 1) + 1];
    let lo = dc[reg[this.ra] + (this.imm << 1)];

    reg[this.rd] = (hi << 8) | lo;
  }
}

export default Lhuc;
