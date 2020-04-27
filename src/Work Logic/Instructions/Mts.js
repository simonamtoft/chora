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
		if(this.sd === "s0"){
			reg[this.sd] &= 0xFF;
			reg["p0"] = 1;
			reg["p1"] = reg["s0"] >> 1;
			reg["p2"] = reg["s0"] >> 2;
			reg["p3"] = reg["s0"] >> 3;
			reg["p4"] = reg["s0"] >> 4;
			reg["p5"] = reg["s0"] >> 5;
			reg["p6"] = reg["s0"] >> 6;
			reg["p7"] = reg["s0"] >> 7;
		}
	}
	toString(){
		return `${this.pred ? `(${this.pred&0b1000 ? "!" : ""}p${this.pred&0b0111}) ` : ""}${this.name} ${this.sd} = ${this.rs1}`;
	}
}

export default Mts;
