import StoreTyped from './StoreTyped'

/** 
 * Sbm instruction class. 
 * @extends StoreTyped
 * @category StoreTyped
 */
class Sbm extends StoreTyped {
	/**
     * Create Sbm instruction.
     * @param {Object}          fields      - Fields to set
     * @param {string|number}   fields.pred - Predicate
     * @param {string}          fields.ra   - Destination
     * @param {string}          fields.rs  	- Source register
     * @param {string|number}   fields.imm  - Immediate offset value
     */
	constructor({ pred, ra, rs, imm }) {
		super({name: "sbm", pred, type: 0b010111, ra, rs, imm});
	}

	/**	
     * Executes the instruction
     * @param {Object}                  state        - Processor state
     * @param {Object.<string, number>} state.reg    - Registers
     */
	execute({ reg, gm }) {
		gm[reg[this.ra] + this.imm] &= 0xFFFFFF00;
		gm[reg[this.ra] + this.imm] |= reg[this.rs] & 0xFF;
	}
}

export default Sbm;
