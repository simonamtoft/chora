import Compare from "./Compare";

/** 
 * Cmpule instruction class. 
 * @extends Compare
 * @category Compare
 */
class Cmpule extends Compare {
    /**
     * Create Cmpule instruction.
     * @param {Object}          fields      - Fields to set
     * @param {string|number}   fields.pred - Predicate
     * @param {string}          fields.pd   - Destination register
     * @param {string}          fields.rs1  - First source register
     * @param {string|number}   fields.op2  - Second operand. Can be a second source register or immediate value.
     */
    constructor({ pred, pd, rs1, op2 }) {
        super({name: "cmpule", func: 0b0101, pred, pd, rs1, op2 });
    }

    /**
     * Executes the instruction
     * @param {Object}                  state       - Processor state
     * @param {Object.<string, number>} state.reg   - Registers
     */
    execute( { reg } ) {
        reg[this.pd] = Number((reg[this.rs1] >>> 0) <= ((this.type == "r" ? 
            reg[this.op2] : Number(this.op2)) >>> 0));
    }
}

export default Cmpule;
