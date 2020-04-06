import StackControl from "./StackControl";

/** 
 * Sspill instruction class. 
 * @extends StackControl
 * @category StackControl
 */
class Sspill extends StackControl {
	/**
     * Create Sspill instruction.
     * @param {Object}          fields      - Fields to set 
     * @param {string|number}   fields.pred - Instruction predicate
	 * @param {number}			fields.s1	- Immediate value 
     */
	constructor({ pred, s1 }) {
		super({name: "sspill", pred, op: 0b11, s1});
	}

	/**
     * Executes the instruction
     * @param {Object}                  state        - Processor state
     * @param {Object.<string, number>} state.reg    - Registers
     */
	execute({ reg  }) {
		let n = Number(this.type === "r" ? reg[this.s1] : this.s1) << 2;
		reg["s5"] -= n;
		// not emulating the actual spill from cache to mem.
	}
}

export default Sspill;
