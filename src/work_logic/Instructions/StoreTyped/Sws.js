import StoreTyped from './StoreTyped'

/** 
 * Sws instruction class. 
 * @extends StoreTyped
 * @category StoreTyped
 */
class Sws extends StoreTyped {
	/**
     * Create Sws instruction.
     * @param {Object}          fields      - Fields to set
     * @param {string|number}   fields.pred - Predicate
     * @param {string}          fields.ra   - Destination
     * @param {string}          fields.rs  	- Source register
     * @param {string|number}   fields.imm  - Immediate offset value
     */
	constructor({ pred, ra, rs, imm }) {
		super({name: "sws", pred, type: 0b000100, ra, rs, imm});
	}

	/**	
     * Executes the instruction
     * @param {Object}                  state        - Processor state
     * @param {Object.<string, number>} state.reg    - Registers
     */
	execute({ reg, sc }) {
		sc[reg[this.ra] + (this.imm << 2)] = reg[this.rs];
	}
}

export default Sws;
