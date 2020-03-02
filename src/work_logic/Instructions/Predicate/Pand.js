import Predicate from "./Predicate";

/** 
 * Pand instruction class. 
 * @extends Predicate
 * @category Predicate
 */
class Pand extends Predicate {
	/**
     * Create Pand instruction.
     * @param {Object}          fields      - Fields to set 
     * @param {string|number}   fields.pred - Instruction predicate
	 * @param {string}			fields.pd 	- Destination register
     * @param {string}          fields.ps1  - First predicate register
     * @param {string}          fields.ps2  - Second predicate register
     */
    constructor({ pred, pd, ps1, ps2 }) {
		super({name: "pand", pred, pd, ps1, ps2, func:0b0111})
	}
	
	/**
     * Executes the instruction
     * @param {Object}                  state        - Processor state
     * @param {Object.<string, number>} state.reg    - Registers
     */
    execute( { reg } ) {
        reg[this.pd] = (reg[this.ps1] & reg[this.ps2]) & 0x1;
    }
}

export default Pand;
