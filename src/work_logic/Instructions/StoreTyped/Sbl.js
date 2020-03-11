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
	constructor({ pred, ra, rs, imm }) {
		super({name: "sbl", pred, type: 0b01001, ra, rs, imm});
	}

	/**	
     * Executes the instruction
     * @param {Object}                  state        - Processor state
     * @param {Object.<string, number>} state.reg    - Registers
     */
	execute({ reg, lm }) {
		let addr = reg[this.ra] + (this.imm);
          lm[addr]   = (reg[this.rs]) & 0xFF;
	}
}

export default Sbl;
