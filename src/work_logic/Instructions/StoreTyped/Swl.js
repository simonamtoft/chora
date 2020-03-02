import StoreTyped from './StoreTyped'

/** 
 * Swl instruction class. 
 * @extends StoreTyped
 * @category StoreTyped
 */
class Swl extends StoreTyped {
	/**
     * Create Swl instruction.
     * @param {Object}          fields      - Fields to set
     * @param {string|number}   fields.pred - Predicate
     * @param {string}          fields.ra   - Destination
     * @param {string}          fields.rs  	- Source register
     * @param {string|number}   fields.imm  - Immediate offset value
     */
	constructor({ }) {
		super({name: "swl", pred, type: 0b000101, ra, rs, imm});
	}

	/**	
     * Executes the instruction
     * @param {Object}                  state        - Processor state
     * @param {Object.<string, number>} state.reg    - Registers
     */
	execute({ reg, lm }) {
		lm[reg[this.ra] + (Imm << 2)] = reg[this.rs];
	}
}

export default Swl;
