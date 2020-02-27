import { compile_reg, compile_imm, compile_long } from "./compilers";

class Add {
    constructor({ pred, rd, rs1, op2 }) {
        this.type = isNaN(op2) ? "add" : (Number(op2) > 0x0FFF ? "addl" : "addi");
        this.rd = rd;
        this.rs1 = rs1;
        this.op2 = op2;
        this.func = 0;

        switch (this.type) {
            case "add":
                this.binary = compile_reg(pred, rd, rs1, op2, this.func);
                break;
            case "addi":
                this.binary = compile_imm(pred, this.func, rd, rs1, op2);
                break;
            case "addl":
                this.binary = compile_long(pred, rd, rs1, this.func, op2);
                break;
            default: 
                console.log("not implemented");
                break;
        }
    }

    execute({ reg }) {
        reg[this.rd] = (reg[this.rs1] + (this.type === "add" ? reg[this.op2] : Number(this.op2))) | 0;
    }
}

export default Add;