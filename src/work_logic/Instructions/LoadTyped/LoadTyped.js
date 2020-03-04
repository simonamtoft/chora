import { compile_reg } from "./compilers";
import { toUint32 } from "../../../helper";

/** 
 * Represents a LoadTyped instruction. Sets common fields. 
 */
export default class LoadTyped {
    /**
     * Create base instruction.
     * @param {Object}          fields      - Fields to set 
     * @param {string}          fields.name - Name of instruction
     * @param {string|number}   fields.pred - Instruction predicate
     * @param {string}          fields.rd   - Destination register
     * @param {string}          fields.ra  	- First source register
     * @param {string}   		fields.type - Second operand. Can be a second source register or immediate value.
	 * @param {number}			fields.imm	- Immediate value 
     */
    constructor({ name, pred, rd, ra, type, imm }) {
        this.name = name;
        this.pred = pred;
        this.rd = rd;
        this.ra = ra;
        this.type = type;
        this.imm = toUint32(imm);	// Imm is interpreted unsigned
        this.binary = compile_reg(pred, rd, ra, type, imm);
    }

    execute() {
        console.error("Missing execute handler for", this);
    }
}
