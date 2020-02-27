import { compile_reg, compile_imm, compile_long } from "./compilers";

class Nor {
    constructor({ pred, rd, rs1, op2 }) {
        this.type = isNaN(op2) == "string" ? "nor" : (Number(op2) > 0x0FFF ? "norl" : "nori");
        this.rd = rd;
        this.rs1 = rs1;
        this.op2 = op2;

        switch (this.type) {
            case "nor":
                this.binary = compile_reg(pred, rd, rs1, op2, 11);
                break;
            case "nori":
                this.binary = compile_imm(pred, 11, rd, rs1, op2);
                break;
            case "norl":
                this.binary = compile_long(pred, rd, rs1, 11, op2);
                break;
            default: 
                console.log("not implemented")
                break;
        }
    }
    
    execute({ reg }) {
        reg[this.rd] = ~((reg[this.rs1] | (this.type == "nor" ? reg[this.op2] : Number(this.op2))) | 0);
    }
}

export default Nor;