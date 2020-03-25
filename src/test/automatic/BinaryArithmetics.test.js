/* eslint-disable no-undef */
import * as BA from "../../work_logic/Instructions/BinaryArithmetics/index";
let initial_state = {
	reg: {
		r0: 0,
		r1: 1,
		r2: 2,
		r3: 3,
		r4: 4,
		r5: 5,
		r6: 6,
		r7: 7,
		r8: 8,
		r9: 9,
		r10: 10,
		r11: 11,
		r12: 12,
		r13: 13,
		r14: 14,
		r15: 15,
		r16: 16,
		r17: 17,
		r18: 18,
		r19: 19,
		r20: 20,
		r21: 21,
		r22: 22,
		r23: 23,
		r24: 24,
		r25: 25,
		r26: 26,
		r27: 27,
		r28: 28,
		r29: 29,
		r30: 30,
		r31: 31
	}
};

test("Add instructions", () => {
	// lazy deep-copy
	let a, e, state = JSON.parse(JSON.stringify(initial_state));

	a = new BA.Add({
		pred: 1,
		rd: "r1",
		rs1: "r2",
		op2: 0x0FFF
	});
	e = state.reg.r2 + 0x0FFF;

	a.execute(state);
	expect(a.name).toBe("add");
	expect(a.binary[0]).toBe(0x08022FFF | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.r1).toBe(e);

	a = new BA.Add({
		pred: 1,
		rd: "r1",
		rs1: "r1",
		op2: "r3"
	});
	e = state.reg.r1 + state.reg.r3;
	a.execute(state);
	expect(a.name).toBe("add");
	expect(a.binary[0]).toBe(0xA021180 | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.r1).toBe(e);

	a = new BA.Add({
		pred: 1,
		rd: "r1",
		rs1: "r2",
		op2: 0xFFFF
	});
	e = state.reg.r2 + 0xFFFF;
	a.execute(state);
	expect(a.name).toBe("add");
	expect(a.binary[0]).toBe(0x8FC22000 | 0);
	expect(a.binary[1]).toBe(0xFFFF | 0);
	expect(state.reg.r1).toBe(e);
});
test("Sub instructions", () => {
	let a, e, state = JSON.parse(JSON.stringify(initial_state));
	a = new BA.Sub({
		pred: 1,
		rd: "r1",
		rs1: "r2",
		op2: "r3"
	});
	e = 0xFFFFFFFF | 0;
	a.execute(state);
	expect(a.name).toBe("sub");
	expect(a.binary[0]).toBe(0x0A022181 | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.r1).toBe(e);

	a = new BA.Sub({
		pred: 1,
		rd: "r2",
		rs1: "r3",
		op2: 0x0FFF
	});
	e = 0xFFFFF004 | 0;
	a.execute(state);
	expect(a.name).toBe("sub");
	expect(a.binary[0]).toBe(0x08443FFF | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.r2).toBe(e);

	a = new BA.Sub({
		pred: 1,
		rd: "r3",
		rs1: "r4",
		op2: 0xDEADBEEF
	});
	e = 0x21524115 | 0;
	a.execute(state);
	expect(a.name).toBe("sub");
	expect(a.binary[0]).toBe(0x8FC64001 | 0);
	expect(a.binary[1]).toBe(0xDEADBEEF | 0);
	expect(state.reg.r3).toBe(e);
});
test("Nor instructions", () => {
	let a, e, state = JSON.parse(JSON.stringify(initial_state));
	a = new BA.Nor({
		pred: 1,
		rd: "r1",
		rs1: "r2",
		op2: "r3"
	});
	e = 0xFFFFFFFFC | 0;
	a.execute(state);
	expect(a.name).toBe("nor");
	expect(a.binary[0]).toBe(0x0A02218B | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.r1).toBe(e);

	a = new BA.Nor({
		pred: 1,
		rd: "r2",
		rs1: "r3",
		op2: "0x0FFF"
	});
	e = 0xFFFFF000 | 0;
	a.execute(state);
	expect(a.name).toBe("nor");
	expect(a.binary[0]).toBe(0x8FC4300B | 0);
	expect(a.binary[1]).toBe(0x0FFF);
	expect(state.reg.r2).toBe(e);

	a = new BA.Nor({
		pred: 1,
		rd: "r3",
		rs1: "r4",
		op2: "0xDEADBEEF"
	});
	e = 0x21524110 | 0;
	a.execute(state);
	expect(a.name).toBe("nor");
	expect(a.binary[0]).toBe(0x8FC6400B | 0);
	expect(a.binary[1]).toBe(0xDEADBEEF | 0);
	expect(state.reg.r3).toBe(e);
});
test("Xor instructions", () => {
	let a, e, state = JSON.parse(JSON.stringify(initial_state));
	a = new BA.Xor({
		pred: 1,
		rd: "r1",
		rs1: "r2",
		op2: "r3"
	});
	e = 0x000000001 | 0;
	a.execute(state);
	expect(a.name).toBe("xor");
	expect(a.binary[0]).toBe(0x0A022182 | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.r1).toBe(e);

	a = new BA.Xor({
		pred: 1,
		rd: "r2",
		rs1: "r3",
		op2: 0x0FFF
	});
	e = 0x00000FFC | 0;
	a.execute(state);
	expect(a.name).toBe("xor");
	expect(a.binary[0]).toBe(0x08843FFF | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.r2).toBe(e);

	a = new BA.Xor({
		pred: 1,
		rd: "r3",
		rs1: "r4",
		op2: 0xDEADBEEF
	});
	e = 0xDEADBEEB | 0;
	a.execute(state);
	expect(a.name).toBe("xor");
	expect(a.binary[0]).toBe(0x8FC64002 | 0);
	expect(a.binary[1]).toBe(0xDEADBEEF | 0);
	expect(state.reg.r3).toBe(e);
});
test("ShiftAdd instructions", () => {
	let a, e, state = JSON.parse(JSON.stringify(initial_state));
	a = new BA.ShiftAdd({
		pred: 1,
		rd: "r1",
		rs1: "r2",
		op2: "r3"
	});
	e = 0x00000007 | 0;
	a.execute(state);
	expect(a.name).toBe("shadd");
	expect(a.binary[0]).toBe(0x0A02218C | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.r1).toBe(e);

	a = new BA.ShiftAdd({
		pred: 1,
		rd: "r2",
		rs1: "r3",
		op2: 0x0FFF
	});
	e = 0x00001005 | 0;
	a.execute(state);
	expect(a.name).toBe("shadd");
	expect(a.binary[0]).toBe(0x8FC4300C | 0);
	expect(a.binary[1]).toBe(0x0FFF);
	expect(state.reg.r2).toBe(e);

	a = new BA.ShiftAdd({
		pred: 1,
		rd: "r3",
		rs1: "r4",
		op2: 0xDEADBEEF
	});
	e = 0xDEADBEF7 | 0;
	a.execute(state);
	expect(a.name).toBe("shadd");
	expect(a.binary[0]).toBe(0x8FC6400C | 0);
	expect(a.binary[1]).toBe(0xDEADBEEF | 0);
	expect(state.reg.r3).toBe(e);
});
test("ShiftAdd2 instructions", () => {
	let a, e, state = JSON.parse(JSON.stringify(initial_state));
	a = new BA.ShiftAdd2({
		pred: 1,
		rd: "r1",
		rs1: "r2",
		op2: "r3"
	});
	e = 0x0000000B | 0;
	a.execute(state);
	expect(a.name).toBe("shadd2");
	expect(a.binary[0]).toBe(0x0A02218D | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.r1).toBe(e);

	a = new BA.ShiftAdd2({
		pred: 1,
		rd: "r2",
		rs1: "r3",
		op2: 0x0FFF
	});
	e = 0x0000100B | 0;
	a.execute(state);
	expect(a.name).toBe("shadd2");
	expect(a.binary[0]).toBe(0x8FC4300D | 0);
	expect(a.binary[1]).toBe(0x0FFF);
	expect(state.reg.r2).toBe(e);

	a = new BA.ShiftAdd2({
		pred: 1,
		rd: "r3",
		rs1: "r4",
		op2: 0xDEADBEEF
	});
	e = 0xDEADBEFF | 0;
	a.execute(state);
	expect(a.name).toBe("shadd2");
	expect(a.binary[0]).toBe(0x8FC6400D | 0);
	expect(a.binary[1]).toBe(0xDEADBEEF | 0);
	expect(state.reg.r3).toBe(e);
});
test("ShiftLeft instructions", () => {
	let a, e, state = JSON.parse(JSON.stringify(initial_state));
	a = new BA.ShiftLeft({
		pred: 1,
		rd: "r1",
		rs1: "r2",
		op2: "r3"
	});
	e = 0x10 | 0;
	a.execute(state);
	expect(a.name).toBe("sl");
	expect(a.binary[0]).toBe(0x0A022183 | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.r1).toBe(e);

	a = new BA.ShiftLeft({
		pred: 1,
		rd: "r2",
		rs1: "r3",
		op2: 0x0FFF
	});
	e = 0x80000000 | 0;
	a.execute(state);
	expect(a.name).toBe("sl");
	expect(a.binary[0]).toBe(0x08C43FFF | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.r2).toBe(e);

	a = new BA.ShiftLeft({
		pred: 1,
		rd: "r3",
		rs1: "r4",
		op2: 0xDEADBEEF
	});
	e = 0x00020000 | 0;
	a.execute(state);
	expect(a.name).toBe("sl");
	expect(a.binary[0]).toBe(0x8FC64003 | 0);
	expect(a.binary[1]).toBe(0xDEADBEEF | 0);
	expect(state.reg.r3).toBe(e);
});
test("ShiftRight instructions", () => {
	let a, e, state = JSON.parse(JSON.stringify(initial_state));
	a = new BA.ShiftRight({
		pred: 1,
		rd: "r1",
		rs1: "r2",
		op2: "r3"
	});
	state.reg.r2 = 0xDEADBEEF;
	e = 0x1BD5B7DD | 0;
	a.execute(state);
	expect(a.name).toBe("sr");
	expect(a.binary[0]).toBe(0x0A022184 | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.r1).toBe(e);

	state.reg.r3 = 0xDEADBEEF;
	a = new BA.ShiftRight({
		pred: 1,
		rd: "r2",
		rs1: "r3",
		op2: 0x0FFF
	});
	e = 1 | 0;
	a.execute(state);
	expect(a.name).toBe("sr");
	expect(a.binary[0]).toBe(0x09043FFF | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.r2).toBe(e);
    
	state.reg.r4 = 0xDEADBEEF;
	a = new BA.ShiftRight({
		pred: 1,
		rd: "r3",
		rs1: "r4",
		op2: 0xDEADBEEF
	});
	e = 0x0001BD5B | 0;
	a.execute(state);
	expect(a.name).toBe("sr");
	expect(a.binary[0]).toBe(0x8FC64004 | 0);
	expect(a.binary[1]).toBe(0xDEADBEEF | 0);
	expect(state.reg.r3).toBe(e);
});
test("ShiftRightArithmetic instructions", () => {
	let a, e, state = JSON.parse(JSON.stringify(initial_state));
	a = new BA.ShiftRightArithmetic({
		pred: 1,
		rd: "r1",
		rs1: "r2",
		op2: "r3"
	});
	state.reg.r2 = 0xDEADBEEF;
	e = 0xFBD5B7DD | 0;
	a.execute(state);
	expect(a.name).toBe("sra");
	expect(a.binary[0]).toBe(0x0A022185 | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.r1).toBe(e);

	a = new BA.ShiftRightArithmetic({
		pred: 1,
		rd: "r2",
		rs1: "r3",
		op2: 0x0FFF
	});
	state.reg.r3 = 0xDEADBEEF;
	e = 0xFFFFFFFF | 0;
	a.execute(state);
	expect(a.name).toBe("sra");
	expect(a.binary[0]).toBe(0x09443FFF | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.r2).toBe(e);

	a = new BA.ShiftRightArithmetic({
		pred: 1,
		rd: "r3",
		rs1: "r4",
		op2: 0xDEADBEEF
	});
	state.reg.r4 = 0xDEADBEEF;
	e = 0xFFFFBD5B | 0;
	a.execute(state);
	expect(a.name).toBe("sra");
	expect(a.binary[0]).toBe(0x8FC64005 | 0);
	expect(a.binary[1]).toBe(0xDEADBEEF | 0);
	expect(state.reg.r3).toBe(e);
});