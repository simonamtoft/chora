import StoreTyped from './StoreTyped'

/** 
 * Sbs instruction class. 
 * @extends StoreTyped
 * @category StoreTyped
 */
class Sbs extends StoreTyped {
	/**
     * Create Sbs instruction.
     * @param {Object}          fields      - Fields to set
     * @param {string|number}   fields.pred - Predicate
     * @param {string}          fields.ra   - Destination
     * @param {string}          fields.rs  	- Source register
     * @param {string|number}   fields.imm  - Immediate offset value
     */
	constructor({ pred, ra, rs, imm }) {
		super({name: "sbs", pred, type: 0b010100, ra, rs, imm});
	}

	/**	
     * Executes the instruction
     * @param {Object}                  state        - Processor state
     * @param {Object.<string, number>} state.reg    - Registers
     */
	execute({ reg, sc }) {
		sc[reg[this.ra] + this.imm] &= 0xFFFFFF00;
		sc[reg[this.ra] + this.imm] |= reg[this.rs] & 0xFF;
	}
}

export default Sbs;
