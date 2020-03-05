import { parseNum, parseReg } from "../../helper";

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
 */
class Mfs {
    /**
     * Create Mfs instruction.
     * @param {Object}          fields      - Fields to set
     * @param {string|number}   fields.pred - Predicate
     * @param {string}          fields.rd   - Destination register
     */
    constructor(pred, rd) {
        this.pred = pred;
        this.rd = rd;
        this.memory = compile_reg(pred, rd, "s5");
    }

    /**
     * Executes the instruction
     * @param {Object}                  state        - Processor state
     * @param {Object.<string, number>} state.reg    - Registers
     */
    execute({ reg }) {
        reg[this.rd] = reg["s5"];
    }
}

export default Mfs;
