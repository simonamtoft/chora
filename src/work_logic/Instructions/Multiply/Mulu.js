import Multiply from "./Multiply";

/** 
 * Mulu instruction class. 
 * @extends Multiply
 * @category Multiply
 */
class Mulu extends Multiply {
    /**
     * Create Mulu instruction.
     * @param {Object}          fields      - Fields to set
     * @param {string|number}   fields.pred - Predicate
     * @param {string}          fields.rs1  - First source register
     * @param {string}          fields.rs2  - Second source register
     */
    constructor({ pred, rs1, rs2 }) {
        super({name: "mulu", func: 0b0001, pred, rs1, rs2});
    }

    /**
     * Executes the instruction
     * @param {Object}                  state       - Processor state
     * @param {Object.<string, number>} state.reg   - Registers
     */
    execute( { reg } ) {
        reg["s2"] = Math.imul(reg[this.rs1], reg[this.rs2]);
        reg["s3"] = (((reg[this.rs1] >>> 0) * (reg[this.rs2] >>> 0))/(2**32))>>>0;
    }
}

export default Mulu;
