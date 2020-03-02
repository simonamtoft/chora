import Compare from "./Compare";

/** 
 * Cmpneq instruction class. 
 * @extends Compare
 * @category Compare
 */
class Cmpneq extends Compare {
    /**
     * Create Cmpneq instruction.
     * @param {Object}          fields      - Fields to set
     * @param {string|number}   fields.pred - Predicate
     * @param {string}          fields.pd   - Destination register
     * @param {string}          fields.rs1  - First source register
     * @param {string|number}   fields.op2  - Second operand. Can be a second source register or immediate value.
     */
    constructor({ pred, pd, rs1, op2 }) {
        super({name: "cmpneq", func: 0b0001, pred, pd, rs1, op2 });
    }

    /**
     * Executes the instruction
     * @param {Object}                  state       - Processor state
     * @param {Object.<string, number>} state.reg   - Registers
     */
    execute( { reg } ) {
        reg[this.pd] = Number(reg[this.rs1] != (this.type == "r" ? 
            reg[this.op2] : (Number(this.op2) << 27) >> 27));
    }
}

export default Cmpneq;
