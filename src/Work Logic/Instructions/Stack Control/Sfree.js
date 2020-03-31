import StackControl from "./StackControl";

/** 
 * Sfree instruction class. 
 * @extends StackControl
 * @category StackControl
 */
class Sfree extends StackControl {
	/**
     * Create Sfree instruction.
     * @param {Object}          fields      - Fields to set 
     * @param {string|number}   fields.pred - Instruction predicate
	 * @param {number}			fields.s1	- Immediate value 
     */
	constructor({ pred, s1 }) {
		super({name: "sfree", pred, op: 0b10, s1});
	}

	/**
     * Executes the instruction
     * @param {Object}                  state        - Processor state
     * @param {Object.<string, number>} state.reg    - Registers
     */
	execute({ reg }) {
		// Increment st by n words.
		reg["s6"] += Number(this.s1) << 2;
		// If st > ss, set ss = st
		if(reg["s6"] > reg["s5"]){
			reg["s5"] = reg["s6"];
		}
	}
}

export default Sfree;
