import StoreTyped from './StoreTyped'

/** 
 * Swm instruction class. 
 * @extends StoreTyped
 * @category StoreTyped
 */
class Swm extends StoreTyped {
	/**
     * Create Swm instruction.
     * @param {Object}          fields      - Fields to set
     * @param {string|number}   fields.pred - Predicate
     * @param {string}          fields.ra   - Destination
     * @param {string}          fields.rs  	- Source register
     * @param {string|number}   fields.imm  - Immediate offset value
     */
	constructor({ }) {
		super({name: "swm", pred, type: 0b000111, ra, rs, imm});
	}

	/**	
     * Executes the instruction
     * @param {Object}                  state        - Processor state
     * @param {Object.<string, number>} state.reg    - Registers
     */
	execute({ reg, gm }) {
		gm[reg[this.ra] + (Imm << 2)] = reg[this.rs];
	}
}

export default Swm;
