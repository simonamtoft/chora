import Multiply from "./Multiply";

/** 
 * Mul instruction class. 
 * @extends Multiply
 * @category Multiply
 */
class Mul extends Multiply {
    /**
     * Create Mul instruction.
     * @param {Object}          fields      - Fields to set
     * @param {string|number}   fields.pred - Predicate
     * @param {string}          fields.rs1  - First source register
     * @param {string}          fields.rs2  - Second source register
     */
    constructor({ pred, rs1, rs2 }) {
        super({name: "mul", func: 0b0000, pred, rs1, rs2});
    }

    /**
     * Executes the instruction
     * @param {Object}                  state       - Processor state
     * @param {Object.<string, number>} state.reg   - Registers
     */
    execute( { reg } ) {
        reg["s2"] = reg[this.rs1] * reg[this.rs2];
        reg["s3"] = (reg[this.rs1] * reg[this.rs2]) >>> 32;
    }
}

export default Mul;
