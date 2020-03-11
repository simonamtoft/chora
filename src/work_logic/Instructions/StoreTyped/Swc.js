import StoreTyped from './StoreTyped'

/** 
 * Swc instruction class. 
 * @extends StoreTyped
 * @category StoreTyped
 */
class Swc extends StoreTyped {
	/**
     * Create Swc instruction.
     * @param {Object}          fields      - Fields to set
     * @param {string|number}   fields.pred - Predicate
     * @param {string}          fields.ra   - Destination
     * @param {string}          fields.rs  	- Source register
     * @param {string|number}   fields.imm  - Immediate offset value
     */
	constructor({ pred, ra, rs, imm }) {
		super({name: "swc", pred, type: 0b00010, ra, rs, imm});
	}

	/**	
     * Executes the instruction
     * @param {Object}                  state        - Processor state
     * @param {Object.<string, number>} state.reg    - Registers
     */
	execute({ reg, dc }) {
          let addr = reg[this.ra] + (this.imm << 2);
          dc[addr+3] = (reg[this.rs] >> 24) & 0xFF;
          dc[addr+2] = (reg[this.rs] >> 16) & 0xFF;
          dc[addr+1] = (reg[this.rs] >> 8) & 0xFF;
          dc[addr]   = (reg[this.rs]) & 0xFF;
	}
}

export default Swc;
