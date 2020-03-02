import Compare from "./Compare";
/** 
 * Cmpeq instruction class. 
 * @extends Compare
 */
class Cmpeq extends Compare {
    /**
     * Create Cmpeq instruction.
     * @param {Object}          fields      - Fields to set
     * @param {string|number}   fields.pred - Predicate
     * @param {string}          fields.pd   - Destination register
     * @param {string}          fields.rs1  - First source register
     * @param {string|number}   fields.op2  - Second operand. Can be a second source register or immediate value.
     */
    constructor({ pred, pd, rs1, op2 }) {
        super({name: "cmpeq", func: 0b0000, pred, pd, rs1, op2});
    }

    execute( { reg } ) {
        reg[this.pd] = reg[this.rs1] == (this.type === "r" ? 
            reg[this.op2] : Number(this.op2));
    }
}

export default Cmpeq;
