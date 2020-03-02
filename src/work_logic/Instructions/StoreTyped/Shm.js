import StoreTyped from './StoreTyped'

/** 
 * Shm instruction class. 
 * @extends StoreTyped
 * @category StoreTyped
 */
class Shm extends StoreTyped {
	/**
     * Create Shm instruction.
     * @param {Object}          fields      - Fields to set
     * @param {string|number}   fields.pred - Predicate
     * @param {string}          fields.ra   - Destination
     * @param {string}          fields.rs  	- Source register
     * @param {string|number}   fields.imm  - Immediate offset value
     */
	constructor({ }) {
		super({name: "shm", pred, type: 0b001111, ra, rs, imm});
	}

	/**	
     * Executes the instruction
     * @param {Object}                  state        - Processor state
     * @param {Object.<string, number>} state.reg    - Registers
     */
	execute({ reg, gm }) {
		gm[reg[this.ra] + (Imm << 1)] &= 0xFFFF0000;
		gm[reg[this.ra] + (Imm << 1)] |= reg[this.rs] & 0xFFFF;
	}
}

export default Shm;
