import StoreTyped from "./StoreTyped";

/** 
 * Shl instruction class. 
 * @extends StoreTyped
 * @category StoreTyped
 */
class Shl extends StoreTyped {
	/**
     * Create Shl instruction.
     * @param {Object}          fields      - Fields to set
     * @param {string|number}   fields.pred - Predicate
     * @param {string}          fields.ra   - Destination
     * @param {string}          fields.rs  	- Source register
     * @param {string|number}   fields.imm  - Immediate offset value
     */
	constructor({ pred, ra, rs, imm }) {
		super({name: "shl", pred, type: 0b00101, ra, rs, imm});
	}

	/**	
     * Executes the instruction
     * @param {Object}                  state        - Processor state
     * @param {Object.<string, number>} state.reg    - Registers
     */
	execute({ reg, mem }) {
		let addr = reg[this.ra] + (this.imm << 1);
		mem[addr+0] = (reg[this.rs] >> 8) & 0xFF;
		mem[addr+1] = (reg[this.rs]) & 0xFF;
	}
}

export default Shl;
