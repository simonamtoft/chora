import { compile_reg } from "./compilers";

class Pand {
    constructor({ pred, pd, ps1, ps2 }) {
        this.pd = pd;
        this.ps1 = ps1;
        this.ps2 = ps2;
        this.func = 0b0110;
        this.binary = compile_reg(pred, pd, ps1, ps2, this.func)
    }

    execute( { reg } ) {
        reg[this.pd] = reg[this.ps1] & reg[this.ps2]
    }
}

export default Pand;
