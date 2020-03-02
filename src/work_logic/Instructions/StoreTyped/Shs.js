import StoreTyped from './StoreTyped'

/** 
 * Shs instruction class. 
 * @extends StoreTyped
 * @category StoreTyped
 */
class Shs extends StoreTyped {
	/**
     * Create Shs instruction.
     * @param {Object}          fields      - Fields to set
     * @param {string|number}   fields.pred - Predicate
     * @param {string}          fields.ra   - Destination
     * @param {string}          fields.rs  	- Source register
     * @param {string|number}   fields.imm  - Immediate offset value
     */
	constructor({ }) {
		super({name: "shs", pred, type: 0b001100, ra, rs, imm});
	}

	/**	
     * Executes the instruction
     * @param {Object}                  state        - Processor state
     * @param {Object.<string, number>} state.reg    - Registers
     */
	execute({ reg, sc }) {
		sc[reg[this.ra] + (Imm << 1)] &= 0xFFFF0000;
		sc[reg[this.ra] + (Imm << 1)] |= reg[this.rs] & 0xFFFF;
	}
}

export default Shs;
