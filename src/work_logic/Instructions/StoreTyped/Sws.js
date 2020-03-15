import StoreTyped from "./StoreTyped";

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
		super({name: "sws", pred, type: 0b00000, ra, rs, imm});
	}

	/**	
     * Executes the instruction
     * @param {Object}                  state        - Processor state
     * @param {Object.<string, number>} state.reg    - Registers
     */
	execute({ reg, sc }) {
		let addr = reg[this.ra] + (this.imm << 2);
		sc[addr+3] = (reg[this.rs] >> 24) & 0xFF;
		sc[addr+2] = (reg[this.rs] >> 16) & 0xFF;
		sc[addr+1] = (reg[this.rs] >> 8) & 0xFF;
		sc[addr]   = (reg[this.rs]) & 0xFF;
	}
}

export default Sws;
