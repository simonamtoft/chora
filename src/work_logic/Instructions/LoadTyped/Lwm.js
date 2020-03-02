import LoadTyped from "./LoadTyped";

/** 
 * Lwm instruction class. 
 * @extends LoadTyped
 * @category LoadTyped
 */
class Lwm extends LoadTyped{
    /**
     * Create Lwm instruction.
     * @param {Object}          fields      - Fields to set 
     * @param {string|number}   fields.pred - Instruction predicate
     * @param {string}          fields.rd   - Destination register
     * @param {string}          fields.ra  	- First source register
     * @param {string}   		fields.type - Second operand. Can be a second source register or immediate value.
	 * @param {number}			fields.imm	- Immediate value 
     */
    constructor({ pred, rd, ra, imm }) {
		super({name: "lwm", pred, rd, ra, type: 0b000111, imm});
    }

    /**
     * Executes the instruction
     * @param {Object}                  state        - Processor state
     * @param {Object.<string, number>} state.reg    - Registers
     */
    execute({ reg, gm }) {
        reg[this.rd] = gm[reg[this.ra] + (this.Imm << 2)]; 
    }
}

export default Lws;
