import StoreTyped from './StoreTyped'

/** 
 * Sbl instruction class. 
 * @extends StoreTyped
 * @category StoreTyped
 */
class Sbl extends StoreTyped {
	/**
     * Create Sbl instruction.
     * @param {Object}          fields      - Fields to set
     * @param {string|number}   fields.pred - Predicate
     * @param {string}          fields.ra   - Destination
     * @param {string}          fields.rs  	- Source register
     * @param {string|number}   fields.imm  - Immediate offset value
     */
	constructor({ }) {
		super({name: "sbl", pred, type: 0b010101, ra, rs, imm});
	}

	/**	
     * Executes the instruction
     * @param {Object}                  state        - Processor state
     * @param {Object.<string, number>} state.reg    - Registers
     */
	execute({ reg, lm }) {
		lm[reg[this.ra] + Imm] &= 0xFFFFFF00;
		lm[reg[this.ra] + Imm] |= reg[this.rs] & 0xFF;
	}
}

export default Sbl;
