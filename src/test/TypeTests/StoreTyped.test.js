/* eslint-disable no-undef */
import * as ST from "../../work_logic/Instructions/StoreTyped";
let initial_state = {
	reg: {
		p0: 1,
		p1: 0,
		p2: 0,
		p3: 0,
		p4: 0,
		p5: 0,
		p6: 0,
		p7: 0
	},
	sc: {},
	lm: {},
	dc: {},
	mem: {}
};
for (let i = 0; i < 32; i++)
	initial_state.reg["r" + i] = i;
for (let i = 0; i < 16; i++)
	initial_state.reg["s" + i] = i;
initial_state.reg.s5 = 0x900;
initial_state.reg.s6 = 0x900;

test("Sws instruction", () => {
	let a, state = JSON.parse(JSON.stringify(initial_state));
	a = new ST.Sws({
		pred: 1,
		ra: "r1",
		rs: "r2",
		imm: 0x7F
	});
	state.reg.r2 = 0x12345678;

	a.execute(state);
	expect(a.name).toBe("sws");
	expect(a.binary[0]).toBe(0x0AC0117F | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.mem[state.reg.s6 + state.reg.r1 + (0x7F << 2)+3]).toBe(0x12);
	expect(state.mem[state.reg.s6 + state.reg.r1 + (0x7F << 2)+2]).toBe(0x34);
	expect(state.mem[state.reg.s6 + state.reg.r1 + (0x7F << 2)+1]).toBe(0x56);
	expect(state.mem[state.reg.s6 + state.reg.r1 + (0x7F << 2)  ]).toBe(0x78);
});
test("Swm instruction", () => {
	let a, state = JSON.parse(JSON.stringify(initial_state));
	a = new ST.Swm({
		pred: 1,
		ra: "r1",
		rs: "r2",
		imm: 0x7F
	});
	state.reg.r2 = 0x12345678;

	a.execute(state);
	expect(a.name).toBe("swm");
	expect(a.binary[0]).toBe(0x0AC6117F | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.mem[state.reg.r1 + (0x7F << 2)+3]).toBe(0x12);
	expect(state.mem[state.reg.r1 + (0x7F << 2)+2]).toBe(0x34);
	expect(state.mem[state.reg.r1 + (0x7F << 2)+1]).toBe(0x56);
	expect(state.mem[state.reg.r1 + (0x7F << 2)  ]).toBe(0x78);
});
test("Swl instruction", () => {
	let a, state = JSON.parse(JSON.stringify(initial_state));
	a = new ST.Swl({
		pred: 1,
		ra: "r1",
		rs: "r2",
		imm: 0x7F
	});
	state.reg.r2 = 0x12345678;

	a.execute(state);
	expect(a.name).toBe("swl");
	expect(a.binary[0]).toBe(0x0AC2117F | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.mem[state.reg.r1 + (0x7F << 2)+3]).toBe(0x12);
	expect(state.mem[state.reg.r1 + (0x7F << 2)+2]).toBe(0x34);
	expect(state.mem[state.reg.r1 + (0x7F << 2)+1]).toBe(0x56);
	expect(state.mem[state.reg.r1 + (0x7F << 2)  ]).toBe(0x78);
});
test("Swc instruction", () => {
	let a, state = JSON.parse(JSON.stringify(initial_state));
	a = new ST.Swc({
		pred: 1,
		ra: "r1",
		rs: "r2",
		imm: 0x7F
	});
	state.reg.r2 = 0x12345678;

	a.execute(state);
	expect(a.name).toBe("swc");
	expect(a.binary[0]).toBe(0x0AC4117F | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.mem[state.reg.r1 + (0x7F << 2)+3]).toBe(0x12);
	expect(state.mem[state.reg.r1 + (0x7F << 2)+2]).toBe(0x34);
	expect(state.mem[state.reg.r1 + (0x7F << 2)+1]).toBe(0x56);
	expect(state.mem[state.reg.r1 + (0x7F << 2)  ]).toBe(0x78);
});
test("Shs instruction", () => {
	let a, state = JSON.parse(JSON.stringify(initial_state));
	a = new ST.Shs({
		pred: 1,
		ra: "r1",
		rs: "r2",
		imm: 0x7F
	});
	state.reg.r2 = 0x12345678;

	a.execute(state);
	expect(a.name).toBe("shs");
	expect(a.binary[0]).toBe(0x0AC8117F | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.mem[state.reg.s6 + state.reg.r1 + (0x7F << 1)+3]).toBe(undefined);
	expect(state.mem[state.reg.s6 + state.reg.r1 + (0x7F << 1)+2]).toBe(undefined);
	expect(state.mem[state.reg.s6 + state.reg.r1 + (0x7F << 1)+1]).toBe(0x56);
	expect(state.mem[state.reg.s6 + state.reg.r1 + (0x7F << 1)  ]).toBe(0x78);
});
test("Shm instruction", () => {
	let a, state = JSON.parse(JSON.stringify(initial_state));
	a = new ST.Shm({
		pred: 1,
		ra: "r1",
		rs: "r2",
		imm: 0x7F
	});
	state.reg.r2 = 0x12345678;

	a.execute(state);
	expect(a.name).toBe("shm");
	expect(a.binary[0]).toBe(0x0ACE117F | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.mem[state.reg.r1 + (0x7F << 1)+3]).toBe(undefined);
	expect(state.mem[state.reg.r1 + (0x7F << 1)+2]).toBe(undefined);
	expect(state.mem[state.reg.r1 + (0x7F << 1)+1]).toBe(0x56);
	expect(state.mem[state.reg.r1 + (0x7F << 1)  ]).toBe(0x78);
});
test("Shl instruction", () => {
	let a, state = JSON.parse(JSON.stringify(initial_state));
	a = new ST.Shl({
		pred: 1,
		ra: "r1",
		rs: "r2",
		imm: 0x7F
	});
	state.reg.r2 = 0x12345678;

	a.execute(state);
	expect(a.name).toBe("shl");
	expect(a.binary[0]).toBe(0x0ACA117F | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.mem[state.reg.r1 + (0x7F << 1)+3]).toBe(undefined);
	expect(state.mem[state.reg.r1 + (0x7F << 1)+2]).toBe(undefined);
	expect(state.mem[state.reg.r1 + (0x7F << 1)+1]).toBe(0x56);
	expect(state.mem[state.reg.r1 + (0x7F << 1)  ]).toBe(0x78);
});
test("Shc instruction", () => {
	let a, state = JSON.parse(JSON.stringify(initial_state));
	a = new ST.Shc({
		pred: 1,
		ra: "r1",
		rs: "r2",
		imm: 0x7F
	});
	state.reg.r2 = 0x12345678;

	a.execute(state);
	expect(a.name).toBe("shc");
	expect(a.binary[0]).toBe(0x0ACC117F | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.mem[state.reg.r1 + (0x7F << 1)+3]).toBe(undefined);
	expect(state.mem[state.reg.r1 + (0x7F << 1)+2]).toBe(undefined);
	expect(state.mem[state.reg.r1 + (0x7F << 1)+1]).toBe(0x56);
	expect(state.mem[state.reg.r1 + (0x7F << 1)  ]).toBe(0x78);
});
test("Sbs instruction", () => {
	let a, state = JSON.parse(JSON.stringify(initial_state));
	a = new ST.Sbs({
		pred: 1,
		ra: "r1",
		rs: "r2",
		imm: 0x7F
	});
	state.reg.r2 = 0x12345678;

	a.execute(state);
	expect(a.name).toBe("sbs");
	expect(a.binary[0]).toBe(0x0AD0117F | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.mem[state.reg.s6 + state.reg.r1 + (0x7F)+3]).toBe(undefined);
	expect(state.mem[state.reg.s6 + state.reg.r1 + (0x7F)+2]).toBe(undefined);
	expect(state.mem[state.reg.s6 + state.reg.r1 + (0x7F)+1]).toBe(undefined);
	expect(state.mem[state.reg.s6 + state.reg.r1 + (0x7F)  ]).toBe(0x78);
});
test("Sbm instruction", () => {
	let a, state = JSON.parse(JSON.stringify(initial_state));
	a = new ST.Sbm({
		pred: 1,
		ra: "r1",
		rs: "r2",
		imm: 0x7F
	});
	state.reg.r2 = 0x12345678;

	a.execute(state);
	expect(a.name).toBe("sbm");
	expect(a.binary[0]).toBe(0x0AD6117F | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.mem[state.reg.r1 + (0x7F)+3]).toBe(undefined);
	expect(state.mem[state.reg.r1 + (0x7F)+2]).toBe(undefined);
	expect(state.mem[state.reg.r1 + (0x7F)+1]).toBe(undefined);
	expect(state.mem[state.reg.r1 + (0x7F)  ]).toBe(0x78);
});
test("Sbl instruction", () => {
	let a, state = JSON.parse(JSON.stringify(initial_state));
	a = new ST.Sbl({
		pred: 1,
		ra: "r1",
		rs: "r2",
		imm: 0x7F
	});
	state.reg.r2 = 0x12345678;

	a.execute(state);
	expect(a.name).toBe("sbl");
	expect(a.binary[0]).toBe(0x0AD2117F | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.mem[state.reg.r1 + (0x7F)+3]).toBe(undefined);
	expect(state.mem[state.reg.r1 + (0x7F)+2]).toBe(undefined);
	expect(state.mem[state.reg.r1 + (0x7F)+1]).toBe(undefined);
	expect(state.mem[state.reg.r1 + (0x7F)  ]).toBe(0x78);
});
test("Sbc instruction", () => {
	let a, state = JSON.parse(JSON.stringify(initial_state));
	a = new ST.Sbc({
		pred: 1,
		ra: "r1",
		rs: "r2",
		imm: 0x7F
	});
	state.reg.r2 = 0x12345678;

	a.execute(state);
	expect(a.name).toBe("sbc");
	expect(a.binary[0]).toBe(0x0AD4117F | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.mem[state.reg.r1 + (0x7F)+3]).toBe(undefined);
	expect(state.mem[state.reg.r1 + (0x7F)+2]).toBe(undefined);
	expect(state.mem[state.reg.r1 + (0x7F)+1]).toBe(undefined);
	expect(state.mem[state.reg.r1 + (0x7F)  ]).toBe(0x78);
});