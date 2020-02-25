
class AluReg {
    constructor(instruction) {
        this.func = (instruction >>> 0) & 0x0F;
        this.rs2 = (instruction >>> 7) & 0x1F;
        this.rs1 = (instruction >>> 12) & 0x1F;
        this.rd = (instruction >>> 17) & 0x1F;
        this.pred = (instruction >>> 27) & 0x0F;
        this.output = -1;
    }
}

class DecodeReg extends AluReg {
    constructor(instruction) {super(instruction)}

    execute() {
        switch(this.func) {
            // Add
            case 0: 
                this.output = this.rs1 + this.rs2; 
                console.log("AddReg executed on, ", this.func)
                break;

            // Sub
            case 1: 
                this.output = this.rs1 - this.rs2; 
                console.log("SubReg executed on, ", this.func)
                break;

            // Xor
            case 2: 
                this.output = this.rs1 ^ this.rs2; 
                console.log("XorReg executed on, ", this.func)
                break; 
            
            // sl
            case 3: 
                this.output = this.rs1 << (this.rs2 & 0x1F); 
                console.log("SlReg executed on, ", this.func)
                break;

            // sr
            case 4:
                this.output = this.rs1 >>> (this.rs2 & 0x1F);
                console.log("SrReg executed on, ", this.func)
                break;
            
            // sra
            case 5:
                this.output = this.rs1 >> (this.rs2 & 0x1F); 
                console.log("SraReg executed on, ", this.func)
                break;
            
            // or
            case 6:
                this.output = this.rs1 | this.rs2; 
                console.log("OrReg executed on, ", this.func)
                break;
            
            // and
            case 7:
                this.output = this.rs1 & this.rs2; 
                console.log("AndReg executed on, ", this.func)
                break;
            
            // nor
            case 11: 
                this.output = ~(this.rs1 | this.rs2); 
                console.log("NorReg executed on, ", this.func)
                break;
            
            // shadd
            case 12:
                this.output = (this.rs1 << 1) + this.rs2; 
                console.log("ShaddReg executed on, ", this.func)
                break;
            
            // shadd2
            case 13:
                this.output = (this.rs1 << 1) + this.rs2; 
                console.log("Shadd2Reg executed on, ", this.func)
                break;

            // Unused Instructions  
            case 8: 
            case 9: 
            case 10: 
            case 14: 
            case 15: console.log("Unused func in AluReg: ", this.func); break;
        }
    }
}

// Need to send result "this.output" to register RD

export default AluReg;
export default DecodeReg;
