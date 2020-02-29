import { compile_reg } from "./compilers";

class Lws {
    constructor({ pred, rd, ra, imm }) {
        this.pd = pd;
        this.ps1 = ps1;
        this.ps2 = ps2;
        this.type = 0b000100;
        this.binary = compile_reg(pred, rd, ra, this.type, imm)
    }

}
