import Predicate from "./Predicate";

/** 
 * Pand instruction class. 
 * @extends Predicate
 * @category Predicate
 */
class Pxor extends Predicate {
	/**
     * Create Pxor instruction.
     * @param {Object}          fields      - Fields to set 
     * @param {string|number}   fields.pred - Instruction predicate
	 * @param {string}			fields.pd 	- Destination register
     * @param {string}          fields.ps1  - First predicate register
     * @param {string}          fields.ps2  - Second predicate register
     */
    constructor({ pred, pd, ps1, ps2 }) {
		super({name: "pxor", pred, pd, ps1, ps2, func:0b1010})
	}
	
	/**
     * Executes the instruction
     * @param {Object}                  state        - Processor state
     * @param {Object.<string, number>} state.reg    - Registers
     */
    execute( { reg } ) {
        reg[this.pd] = ((this.neg1 ? ~reg[this.ps1] : reg[this.ps1]) ^ (this.neg2 ? ~reg[this.ps2] : reg[this.ps2])) & 0x1;
    }
}

export default Pxor;
