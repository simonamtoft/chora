/* eslint-disable no-undef */

import Assembler from "../work_logic/Processor/_Assembler";

test("Test labels", () => {
	let a = new Assembler();
	let assembly = `
    #a comment
    label1: (!p6) add r1 = r0, 255; add r2 = r1, 0
    (!p0) add r1 = r1, r2 #another comment
    addl r1 = r0, 0
    add r1 = r0, 0x1000
    ADD R1 = r2, 69
    nop: nop
    mov: 
    mov r1 = r2   
    li r69 = 255
    li r1 = -255
    add r1 = r0, label3
    label3: nop
    pclr p1 = 0
    add r1 = r0, 255 || add r2 = r0, 123
    add r1 = r0, 255 || add r2 = r0, 123
    `;
	a.run(assembly);
	console.log(a.bundles);    
	for(let bundle of a.bundles){
		console.log(JSON.stringify(bundle, null, 2));
	}
});