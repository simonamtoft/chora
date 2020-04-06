/* eslint-disable no-undef */

import Assembler from "../../Work Logic/Processor/Assembler";
import CPU from "../../Work Logic/Processor/CPU";

test("Test assembly", () => {
	let a = new Assembler();
	let assembly = `
    #a comment
    label1: (!p6) add r1 = r0, 255; add r2 = r1, 0
    (!p0) add r1 = r1, r2 #another comment
    addl r1 = r0, 0
    add r1 = r0, 0x1000
	Add R1 = r2, 69
	asdf2: nop
    asdf3: 
    mov r1 = r2   
    li r3 = 255
    li r1 = -255
    add r1 = r0, label3
    label3: nop
    pclr P1 = 0
    add r1 = r0, 255 || add r2 = r0, 123
    add r1 = r0, 255 || add r2 = r0, 123
    `;
	expect(a.run(assembly)).toBe(true);
});

test("Test run", () => {
	let cpu = new CPU();
	let assembler = new Assembler();
	let assembly = "li r0 = 255; li r1 = 123; add r2 = r1, 123;";
	assembler.run(assembly);
	cpu.populate(assembler.bundles);
	cpu.step();
	expect(cpu.getPC()).toBe(4);
	expect(cpu.state.reg.r0).toBe(0);
	cpu.step();
	expect(cpu.getPC()).toBe(8);
	expect(cpu.state.reg.r1).toBe(123);
	cpu.prev();
	expect(cpu.getPC()).toBe(4);
	expect(cpu.state.reg.r1).toBe(0);
    
	cpu.reset();
	cpu.populate(assembler.bundles);
	cpu.run();
	expect(cpu.getPC()).toBe(12);
	expect(cpu.state.reg.r2).toBe(246);
	expect(cpu.state.reg.r1).toBe(123);
	expect(cpu.state.reg.r0).toBe(0);
});