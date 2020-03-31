import { parseNum, parseReg } from "../../Helpers/misc";

const compile_reg = (pred, rs1, sd) => {
	let binary = [0];

	pred = parseNum(pred);
	rs1 = parseReg(rs1);
	sd = parseReg(sd); 

	binary[0] |= pred << 27;
	binary[0] |= 0b01001 << 22;
	binary[0] |= rs1 << 12;
	binary[0] |= 0b010 << 4;
	binary[0] |= sd << 0;

	return binary;
};

/** 
 * Move to special instruction class. 
 * @category MoveToSpecial
 */
class Mts {
	/**
     * Create Mts instruction.
     * @param {Object}          fields      - Fields to set
     * @param {string|number}   fields.pred - Predicate
     * @param {string}          fields.rs1  - Source register
     * @param {string}          fields.sd   - Special destination register
     */
	constructor({pred, rs1, sd}) {
		this.name = "mts";
		this.pred = pred;
		this.rs1 = rs1;
		this.sd = sd;
		this.binary = compile_reg(pred, rs1, sd);
	}

	/**
     * Executes the instruction
     * @param {Object}                  state        - Processor state
     * @param {Object.<string, number>} state.reg    - Registers
     */
	execute({ reg }) {
		reg[this.sd] = reg[this.rs1];
	}
}

export default Mts;
