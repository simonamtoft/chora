import StoreTyped from './StoreTyped'

/** 
 * Swm instruction class. 
 * @extends StoreTyped
 * @category StoreTyped
 */
class Swm extends StoreTyped {
	/**
     * Create Swm instruction.
     * @param {Object}          fields      - Fields to set
     * @param {string|number}   fields.pred - Predicate
     * @param {string}          fields.ra   - Destination
     * @param {string}          fields.rs  	- Source register
     * @param {string|number}   fields.imm  - Immediate offset value
     */
	constructor({ pred, ra, rs, imm }) {
		super({name: "swm", pred, type: 0b00011, ra, rs, imm});
	}

	/**	
     * Executes the instruction
     * @param {Object}                  state        - Processor state
     * @param {Object.<string, number>} state.reg    - Registers
     */
	execute({ reg, gm }) {
          let addr = reg[this.ra] + (this.imm << 2);
          gm[addr+3] = (reg[this.rs] >> 24) & 0xFF;
          gm[addr+2] = (reg[this.rs] >> 16) & 0xFF;
          gm[addr+1] = (reg[this.rs] >> 8) & 0xFF;
          gm[addr]   = (reg[this.rs]) & 0xFF;
	}
}

export default Swm;
