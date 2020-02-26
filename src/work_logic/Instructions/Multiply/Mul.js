import { compile_reg } from "./compilers";

class Mul {
    constructor({ pred, rs1, rs2, sl, sh }) {
        this.sl = sl;
        this.sh = sh;
        this.pred = pred;
        this.rs1 = rs1;
        this.rs2 = rs2;
        this.func = 0b0000;
        this.binary = compile_reg(pred, pd, rs1, rs2, this.func)
    }

    execute( { reg } ) {
        reg[this.sl] = reg[this.rs1] * reg[this.rs2];
        reg[this.sh] = (reg[this.rs1] * reg[this.rs2]) >>> 32;
    }
}

export default Mul;
