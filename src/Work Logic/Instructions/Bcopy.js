import { parseNum, parseReg } from "../../Helpers/misc";

export const compile_reg = (pred, rd, rs1, imm, ps) => {
	let binary = [0];

	pred = parseNum(pred);
	imm = parseNum(imm);
	rd = parseReg(rd);
	rs1 = parseReg(rs1);
	ps = parseReg(ps); 

	binary[0] |= pred << 27;
	binary[0] |= 0b01000 << 22;
	binary[0] |= rd << 17;
	binary[0] |= rs1 << 12;
	binary[0] |= imm << 7;
	binary[0] |= 0b101 << 4;
	binary[0] |= ps << 0;

	return binary;
};

/** 
 * Bitcopy instruction class. 
 * @category Bitcopy
 */
class Bcopy {
	/**
     * Create Bcopy instruction.
     * @param {Object}          fields      - Fields to set
     * @param {string|number}   fields.pred - Predicate
     * @param {string}          fields.rd   - Destination register
     * @param {string}          fields.rs1  - First source register
     * @param {number}          fields.imm  - Second operand, immediate value.
     * @param {string}          fields.ps   - Predicate register. (can be negated)
     */
	constructor({pred, rd, rs1, imm, neg, ps}) {
		this.name = "bcopy";
		this.pred = pred;
		this.rd = rd;
		this.rs1 = rs1;
		this.imm = imm & 0x1F;
		this.neg = neg;
		this.ps = ps; 
		this.binary = compile_reg(pred, rd, rs1, imm, ps); 
	}

	/**
     * Executes the instruction
     * @param {Object}                  state        - Processor state
     * @param {Object.<string, number>} state.reg    - Registers
     */
	execute({ reg }) {
		let shift = (this.neg === "~") === (reg[this.ps] === 1) ? 0 : 1; // Handle negation of p-register
		reg[this.rd] = (reg[this.rs1] & ~(1 << this.imm)) | (shift << this.imm);
	}

	toString(){
		return `${this.pred ? `(${this.pred&0b1000 ? "!" : ""}p${this.pred&0b0111}) ` : ""}${this.name} ${this.rd} = ${this.rs1}, ${this.imm}, ${this.neg ? "~" : ""}${this.ps}`;
	}

}

export default Bcopy;
