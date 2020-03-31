import StoreTyped from "./StoreTyped";

/** 
 * Shs instruction class. 
 * @extends StoreTyped
 * @category StoreTyped
 */
class Shs extends StoreTyped {
	/**
     * Create Shs instruction.
     * @param {Object}          fields      - Fields to set
     * @param {string|number}   fields.pred - Predicate
     * @param {string}          fields.ra   - Destination
     * @param {string}          fields.rs  	- Source register
     * @param {string|number}   fields.imm  - Immediate offset value
     */
	constructor({ pred, ra, rs, imm }) {
		super({name: "shs", pred, type: 0b00100, ra, rs, imm});
	}

	/**	
     * Executes the instruction
     * @param {Object}                  state        - Processor state
     * @param {Object.<string, number>} state.reg    - Registers
     */
	execute({ reg, mem }) {
		let addr = reg["s6"] + reg[this.ra] + (this.imm << 1);
		mem[addr+1] = (reg[this.rs] >> 8) & 0xFF;
		mem[addr]   = (reg[this.rs]) & 0xFF;
	}
}

export default Shs;
