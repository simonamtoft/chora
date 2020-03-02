import StoreTyped from './StoreTyped'

/** 
 * Shl instruction class. 
 * @extends StoreTyped
 * @category StoreTyped
 */
class Shl extends StoreTyped {
	/**
     * Create Shl instruction.
     * @param {Object}          fields      - Fields to set
     * @param {string|number}   fields.pred - Predicate
     * @param {string}          fields.ra   - Destination
     * @param {string}          fields.rs  	- Source register
     * @param {string|number}   fields.imm  - Immediate offset value
     */
	constructor({ }) {
		super({name: "shl", pred, type: 0b001101, ra, rs, imm});
	}

	/**	
     * Executes the instruction
     * @param {Object}                  state        - Processor state
     * @param {Object.<string, number>} state.reg    - Registers
     */
	execute({ reg, lm }) {
		lm[reg[this.ra] + (Imm << 1)] &= 0xFFFF0000;
		lm[reg[this.ra] + (Imm << 1)] |= reg[this.rs] & 0xFFFF;
	}
}

export default Shl;
