import { compile_reg, compile_imm } from "./compilers";

class Btest {
    constructor({ pred, pd, rs1, op2 }) {
        this.type = isNaN(op2) ? "norm" : "imm";
        this.pd = pd;
        this.rs1 = rs1;
        this.op2 = op2;
        this.func = 0b0110;
    
        if (this.type == "norm") {
            this.binary = compile_reg(pred, pd, rs1, op2, this.func)
        } else {
            this.binary = compile_imm(pred, pd, rs1, op2, this.func)
        }
    }

    execute( { reg } ) {
        reg[this.pd] = reg[this.rs1] & ( 1 << (this.type == "norm" ? reg[this.op2] : this.op2)) != 0
    }
}

export default Btest;
