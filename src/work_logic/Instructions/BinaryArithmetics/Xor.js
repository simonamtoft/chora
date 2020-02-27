import { compile_reg, compile_imm, compile_long } from "./compilers";
class Xor {
    constructor({ pred, rd, rs1, op2 }) {
        this.type = isNaN(op2) == "string" ? "xor" : (Number(op2) > 0x0FFF ? "xorl" : "xori");
        this.rd = rd;
        this.rs1 = rs1;
        this.op2 = op2;
        switch (this.type) {
            case "xor":
                this.binary = compile_reg(pred, rd, rs1, op2, 2);
                break;
            case "xori":
                this.binary = compile_imm(pred, 2, rd, rs1, op2);
                break;
            case "xorl":
                this.binary = compile_long(pred, rd, rs1, 2, op2);
                break;
            default: 
                console.log("not implemented");
                break;
        }
    }
    execute({ reg }) {
        reg[this.rd] = (reg[this.rs1] ^ (this.type == "xor" ? reg[this.op2] : Number(this.op2))) | 0;
    }
}

export default Xor;