import { parseNum, parseReg } from "../../Helpers/misc";

export const compile_reg = (pred, rd, ss) => {
	let binary = [0];

	pred = parseNum(pred);
	rd = parseReg(rd);
	ss = parseReg(ss); 

	binary[0] |= pred << 27;
	binary[0] |= 0b01001 << 22;
	binary[0] |= rd << 17;
	binary[0] |= 0b011 << 4;
	binary[0] |= ss << 0;

	return binary;
};

/** 
 * Move from special instruction class. 
 * @category MoveFromSpecial
 */
class Mfs {
	/**
     * Create Mfs instruction.
     * @param {Object}          fields      - Fields to set
     * @param {string|number}   fields.pred - Predicate
     * @param {string}          fields.rd   - Destination register
	 * @param {string}			fields.ss	- Special source register
     */
	constructor({pred, rd, ss}) {
		this.name = "mfs";
		this.pred = pred;
		this.rd = rd;
		this.ss = ss;
		this.binary = compile_reg(pred, rd, ss);
	}

	/**
     * Executes the instruction
     * @param {Object}                  state        - Processor state
     * @param {Object.<string, number>} state.reg    - Registers
     */
	execute({ reg }) {
		reg[this.rd] = reg[this.ss];
	}
	toString(){
		return `${this.pred ? `(${this.pred&0b1000 ? "!" : ""}p${this.pred&0b0111})` : ""} ${this.name} ${this.rd} = ${this.ss}`;
	}
}

export default Mfs;
