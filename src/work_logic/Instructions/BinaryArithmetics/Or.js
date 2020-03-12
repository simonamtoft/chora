import BinaryArithmetics from "./BinaryArithmetics";

/** 
 * Or instruction class. 
 * @extends BinaryArithmetics
 * @category BinaryArithmetics
 */
class Or extends BinaryArithmetics {
    /**
     * Create Or instruction.
     * @param {Object}          fields      - Fields to set
     * @param {string|number}   fields.pred - Predicate
     * @param {string}          fields.rd   - Destination register
     * @param {string}          fields.rs1  - First source register
     * @param {string|number}   fields.op2  - Second operand. Can be a second source register or immediate value.
     */
    constructor({ pred, rd, rs1, op2 }) {
        super({ name: "or", func: 6, pred, rd, rs1, op2 });
	}
	
    /**
     * Executes the instruction
     * @param {Object}                  state        - Processor state
     * @param {Object.<string, number>} state.reg    - Registers
     */
    execute({ reg }) {
        reg[this.rd] = reg[this.rs1] | reg[this.op2];
    }
}

export default Or;