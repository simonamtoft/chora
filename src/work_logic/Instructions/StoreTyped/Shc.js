import StoreTyped from './StoreTyped'

/** 
 * Shc instruction class. 
 * @extends StoreTyped
 * @category StoreTyped
 */
class Shc extends StoreTyped {
	/**
     * Create Shc instruction.
     * @param {Object}          fields      - Fields to set
     * @param {string|number}   fields.pred - Predicate
     * @param {string}          fields.ra   - Destination
     * @param {string}          fields.rs  	- Source register
     * @param {string|number}   fields.imm  - Immediate offset value
     */
	constructor({ }) {
		super({name: "shc", pred, type: 0b001110, ra, rs, imm});
	}

	/**	
     * Executes the instruction
     * @param {Object}                  state        - Processor state
     * @param {Object.<string, number>} state.reg    - Registers
     */
	execute({ reg, dc }) {
		dc[reg[this.ra] + (Imm << 1)] &= 0xFFFF0000;
		dc[reg[this.ra] + (Imm << 1)] |= reg[this.rs] & 0xFFFF;
	}
}

export default Shc;
