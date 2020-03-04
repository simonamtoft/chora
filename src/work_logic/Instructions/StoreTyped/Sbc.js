import StoreTyped from './StoreTyped'

/** 
 * Sbc instruction class. 
 * @extends StoreTyped
 * @category StoreTyped
 */
class Sbc extends StoreTyped {
	/**
     * Create Sbc instruction.
     * @param {Object}          fields      - Fields to set
     * @param {string|number}   fields.pred - Predicate
     * @param {string}          fields.ra   - Destination
     * @param {string}          fields.rs  	- Source register
     * @param {string|number}   fields.imm  - Immediate offset value
     */
	constructor({ }) {
		super({name: "sbc", pred, type: 0b010110, ra, rs, imm});
	}

	/**	
     * Executes the instruction
     * @param {Object}                  state        - Processor state
     * @param {Object.<string, number>} state.reg    - Registers
     */
	execute({ reg, dc }) {
		dc[reg[this.ra] + Imm] &= 0xFFFFFF00;
		dc[reg[this.ra] + Imm] |= reg[this.rs] & 0xFF;
	}
}

export default Sbc;