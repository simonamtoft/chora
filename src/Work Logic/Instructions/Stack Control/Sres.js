import StackControl from "./StackControl";

/** 
 * Sres instruction class. 
 * @extends StackControl
 * @category StackControl
 */
class Sres extends StackControl {
	/**
     * Create Sres instruction.
     * @param {Object}          fields      - Fields to set 
     * @param {string|number}   fields.pred - Instruction predicate
     * @param {string}          fields.s1   - Immediate value
     */
	constructor({ pred, s1 }) {
		super({name: "sres", pred, op: 0b00, s1});
	}

	/**
     * Executes the instruction
     * @param {Object}                  state        - Processor state
     * @param {Object.<string, number>} state.reg    - Registers
     */
	execute({ reg/*, sc*/ }) {
		let nspill;
		reg["s6"] -= Number(this.s1) << 2; // Words to bytes.
		nspill = reg["s5"] - reg["s6"]; //- sc["MAX_SIZE"]; // max_size of our imaginary cache as 0 would be boring :)
		for(let i = 0; i < nspill; ++i){
			reg["s5"] -= 1;
			// Copying not needed as we have no actual cache.
			//gm[reg["s5"]] = sc[reg["s5"]]; // No masking, just keep the keys identical between sc and gm.
		}
	}
}

export default Sres;
