import StoreTyped from './StoreTyped'

/** 
 * Swl instruction class. 
 * @extends StoreTyped
 * @category StoreTyped
 */
class Swl extends StoreTyped {
	/**
     * Create Swl instruction.
     * @param {Object}          fields      - Fields to set
     * @param {string|number}   fields.pred - Predicate
     * @param {string}          fields.ra   - Destination
     * @param {string}          fields.rs  	- Source register
     * @param {string|number}   fields.imm  - Immediate offset value
     */
	constructor({ pred, ra, rs, imm }) {
		super({name: "swl", pred, type: 0b00001, ra, rs, imm});
	}

	/**	
     * Executes the instruction
     * @param {Object}                  state        - Processor state
     * @param {Object.<string, number>} state.reg    - Registers
     */
	execute({ reg, lm }) {
          let addr = reg[this.ra] + (this.imm << 2);
          lm[addr+3] = (reg[this.rs] >> 24) & 0xFF;
          lm[addr+2] = (reg[this.rs] >> 16) & 0xFF;
          lm[addr+1] = (reg[this.rs] >> 8) & 0xFF;
          lm[addr]   = (reg[this.rs]) & 0xFF;
	}
}

export default Swl;
