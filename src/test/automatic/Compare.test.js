/* eslint-disable no-undef */
import * as C from "../../work_logic/Instructions/Compare/index";
let initial_state = {reg:{
	p0: 1,
	p1: 0,
	p2: 0,
	p3: 0,
	p4: 0,
	p5: 0,
	p6: 0,
	p7: 0
}};
for(let i = 0; i < 32; i++)
	initial_state.reg["r"+i] = i;

test("Cmpeq instructions", () => {
	let a, e, state = JSON.parse(JSON.stringify(initial_state));
	a = new C.Cmpeq({
		pred: 1,
		pd: "p1",
		rs1: "r2",
		op2: "r3"
	});
	e = 0 | 0;
	a.execute(state);
	expect(a.name).toBe("cmpeq");
	expect(a.binary[0]).toBe(0x0A0221B0 | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.p1).toBe(e);

	state.reg.r3 = -1;
	a = new C.Cmpeq({
		pred: 1,
		pd: "p2",
		rs1: "r3",
		op2: -1
	});
	e = 1 | 0;
	a.execute(state);
	expect(a.name).toBe("cmpeqi");
	expect(a.binary[0]).toBe(0x0A043FE0 | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.p2).toBe(e);
});
test("Cmpneq instructions", () => {
	let a, e, state = JSON.parse(JSON.stringify(initial_state));
	a = new C.Cmpneq({
		pred: 1,
		pd: "p1",
		rs1: "r2",
		op2: "r3"
	});
	e = 1 | 0;
	a.execute(state);
	expect(a.name).toBe("cmpneq");
	expect(a.binary[0]).toBe(0x0A0221B1 | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.p1).toBe(e);

	state.reg.r3 = -1;
	a = new C.Cmpneq({
		pred: 1,
		pd: "p2",
		rs1: "r3",
		op2: -1
	});
	e = 0 | 0;
	a.execute(state);
	expect(a.name).toBe("cmpneqi");
	expect(a.binary[0]).toBe(0x0A043FE1 | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.p2).toBe(e);
});
test("Cmplt instructions", () => {
	let a, e, state = JSON.parse(JSON.stringify(initial_state));
	a = new C.Cmplt({
		pred: 1,
		pd: "p1",
		rs1: "r2",
		op2: "r3"
	});
	e = 1 | 0;
	a.execute(state);
	expect(a.name).toBe("cmplt");
	expect(a.binary[0]).toBe(0x0A0221B2 | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.p1).toBe(e);

	state.reg.r3 = -1;
	a = new C.Cmplt({
		pred: 1,
		pd: "p2",
		rs1: "r3",
		op2: -1
	});
	e = 0 | 0;
	a.execute(state);
	expect(a.name).toBe("cmplti");
	expect(a.binary[0]).toBe(0x0A043FE2 | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.p2).toBe(e);
});
test("Cmple instructions", () => {
	let a, e, state = JSON.parse(JSON.stringify(initial_state));
	a = new C.Cmple({
		pred: 1,
		pd: "p1",
		rs1: "r2",
		op2: "r3"
	});
	e = 1 | 0;
	a.execute(state);
	expect(a.name).toBe("cmple");
	expect(a.binary[0]).toBe(0x0A0221B3 | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.p1).toBe(e);

	state.reg.r3 = -1;
	a = new C.Cmple({
		pred: 1,
		pd: "p2",
		rs1: "r3",
		op2: -1
	});
	e = 1 | 0;
	a.execute(state);
	expect(a.name).toBe("cmplei");
	expect(a.binary[0]).toBe(0x0A043FE3 | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.p2).toBe(e);
});
test("Cmpult instructions", () => {
	let a, e, state = JSON.parse(JSON.stringify(initial_state));
	a = new C.Cmpult({
		pred: 1,
		pd: "p1",
		rs1: "r2",
		op2: "r3"
	});
	e = 1 | 0;
	a.execute(state);
	expect(a.name).toBe("cmpult");
	expect(a.binary[0]).toBe(0x0A0221B4 | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.p1).toBe(e);

	state.reg.r3 = 3;
	a = new C.Cmpult({
		pred: 1,
		pd: "p2",
		rs1: "r3",
		op2: -1
	});
	e = 1 | 0;
	a.execute(state);
	expect(a.name).toBe("cmpulti");
	expect(a.binary[0]).toBe(0x0A043FE4 | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.p2).toBe(e);
});
test("Cmpule instructions", () => {
	let a, e, state = JSON.parse(JSON.stringify(initial_state));
	a = new C.Cmpule({
		pred: 1,
		pd: "p1",
		rs1: "r2",
		op2: "r3"
	});
	e = 1 | 0;
	a.execute(state);
	expect(a.name).toBe("cmpule");
	expect(a.binary[0]).toBe(0x0A0221B5 | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.p1).toBe(e);

	state.reg.r3 = 3;
	a = new C.Cmpule({
		pred: 1,
		pd: "p2",
		rs1: "r3",
		op2: -1
	});
	e = 1 | 0;
	a.execute(state);
	expect(a.name).toBe("cmpulei");
	expect(a.binary[0]).toBe(0x0A043FE5 | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.p2).toBe(e);
});
test("Btest instructions", () => {
	let a, e, state = JSON.parse(JSON.stringify(initial_state));
	a = new C.Btest({
		pred: 1,
		pd: "p1",
		rs1: "r2",
		op2: "r3"
	});
	e = 0 | 0;
	a.execute(state);
	expect(a.name).toBe("btest");
	expect(a.binary[0]).toBe(0x0A0221B6 | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.p1).toBe(e);

	state.reg.r3 = 3;
	a = new C.Btest({
		pred: 1,
		pd: "p2",
		rs1: "r3",
		op2: -1
	});
	e = 0 | 0;
	a.execute(state);
	expect(a.name).toBe("btesti");
	expect(a.binary[0]).toBe(0x0A043FE6 | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.p2).toBe(e);
});