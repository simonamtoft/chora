import React, { Component } from "react";

class Registers extends Component {
    constructor() {
        super();

        let Reg = {
            "r1" : 0, "r2" : 0, "r3" : 0, "r4" : 0, "r5" : 0,
            "r6" : 0, "r7" : 0, "r8" : 0, "r9" : 0, "r10" : 0, 
            "r11" : 0, "r12" : 0, "r13" : 0, "r14" : 0, "r15" : 0,
            "r16" : 0, "r17" : 0, "r18" : 0, "r19" : 0, "r20" : 0, 
            "r21" : 0, "r22" : 0, "r23" : 0, "r24" : 0, "r25" : 0,
            "r26" : 0, "r27" : 0, "r28" : 0, "r29" : 0, "r30" : 0, 
            "r31" : 0
        };

        let SReg = {
            "s1" : 0, "sl" : 0, "sh" : 0, "s4" : 0, "ss" : 0,
            "st" : 0, "srb" : 0, "sro" : 0, "sxb" : 0, "sxo" : 0,
            "s11" : 0, "s12" : 0, "s13" : 0, "s14" : 0, "s15" : 0
        };

        let PReg = {};

        this.state = {
            reg: Reg,
            sreg: SReg,
            preg: PReg,
        };
    }

    render () {
        return(<h1>Registers</h1>);
    }
}

export default Registers;
