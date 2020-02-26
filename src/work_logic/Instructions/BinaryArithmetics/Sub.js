import { compile_reg, compile_imm, compile_long } from "./ALU";
class Sub {
    constructor({ pred, rd, rs1, op2 }) {
        this.type = isNaN(op2) == "string" ? "sub" : (Number(op2) > 0x0FFF ? "subl" : "subi");
        this.rd = rd;
        this.rs1 = rs1;
        this.op2 = op2;
        switch (this.type) {
            case "sub":
                this.binary = compile_reg(pred, rd, rs1, op2, 1);
                break;
            case "subi":
                this.binary = compile_imm(pred, 1, rd, rs1, op2);
                break;
            case "subl":
                this.binary = compile_long(pred, rd, rs1, 1, op2);
                break;
        }
    }
    execute({ reg }) {
        reg[this.rd] = (reg[this.rs1] - (this.type == "sub" ? reg[this.op2] : Number(this.op2))) | 0;
    }
}

export default Sub;