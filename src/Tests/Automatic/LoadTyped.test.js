/* eslint-disable no-undef */
import * as LDT from "../../Work Logic/Instructions/Load Typed";
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
	mem: {}
};
for (let i = 0; i < 32; i++)
	initial_state.reg["r" + i] = i;
for (let i = 0; i < 16; i++)
	initial_state.reg["s" + i] = i;
initial_state.reg.s6 = 0x900;
initial_state.reg.s5 = 0x900;

test("Lws instruction", () => {
	let a, state = JSON.parse(JSON.stringify(initial_state));
	a = new LDT.Lws({
		pred: 1,
		rd: "r1",
		ra: "r2",
		imm: 0x3F
	});

	state.mem[state.reg.s6 + state.reg.r2 + (0x3F<<2)]   = 0xFF|0;
	state.mem[state.reg.s6 + state.reg.r2 + (0x3F<<2)+1] = 0x00|0;
	state.mem[state.reg.s6 + state.reg.r2 + (0x3F<<2)+2] = 0xFF|0;
	state.mem[state.reg.s6 + state.reg.r2 + (0x3F<<2)+3] = 0x00|0;

	a.execute(state);
	expect(a.name).toBe("lws");
	expect(a.binary[0]).toBe(0xA82203F | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.r1).toBe(0xFF00FF00 | 0);
});
test("Lwl instruction", () => {
	let a, state = JSON.parse(JSON.stringify(initial_state));
	a = new LDT.Lwl({
		pred: 1,
		rd: "r1",
		ra: "r2",
		imm: 0x3F
	});

	state.mem[state.reg.r2 + (0x3F<<2)]   = 0xFF|0;
	state.mem[state.reg.r2 + (0x3F<<2)+1] = 0x00|0;
	state.mem[state.reg.r2 + (0x3F<<2)+2] = 0xFF|0;
	state.mem[state.reg.r2 + (0x3F<<2)+3] = 0x00|0;

	a.execute(state);
	expect(a.name).toBe("lwl");
	expect(a.binary[0]).toBe(0xA8220BF | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.r1).toBe(0xFF00FF00 | 0);
});
test("Lwc instruction", () => {
	let a, state = JSON.parse(JSON.stringify(initial_state));
	a = new LDT.Lwc({
		pred: 1,
		rd: "r1",
		ra: "r2",
		imm: 0x3F
	});

	state.mem[state.reg.r2 + (0x3F<<2)]   = 0xFF|0;
	state.mem[state.reg.r2 + (0x3F<<2)+1] = 0x00|0;
	state.mem[state.reg.r2 + (0x3F<<2)+2] = 0xFF|0;
	state.mem[state.reg.r2 + (0x3F<<2)+3] = 0x00|0;

	a.execute(state);
	expect(a.name).toBe("lwc");
	expect(a.binary[0]).toBe(0xA82213F | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.r1).toBe(0xFF00FF00 | 0);
});
test("Lwm instruction", () => {
	let a, state = JSON.parse(JSON.stringify(initial_state));
	a = new LDT.Lwm({
		pred: 1,
		rd: "r1",
		ra: "r2",
		imm: 0x3F
	});

	state.mem[state.reg.r2 + (0x3F<<2)]   = 0xFF|0;
	state.mem[state.reg.r2 + (0x3F<<2)+1] = 0x00|0;
	state.mem[state.reg.r2 + (0x3F<<2)+2] = 0xFF|0;
	state.mem[state.reg.r2 + (0x3F<<2)+3] = 0x00|0;

	a.execute(state);
	expect(a.name).toBe("lwm");
	expect(a.binary[0]).toBe(0xA8221BF | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.r1).toBe(0xFF00FF00 | 0);
});
test("Lhs instruction", () => {
	let a, state = JSON.parse(JSON.stringify(initial_state));
	a = new LDT.Lhs({
		pred: 1,
		rd: "r1",
		ra: "r2",
		imm: 0x3F
	});

	state.mem[state.reg.s6 + state.reg.r2 + (0x3F<<1)+0] = 0xFF|0;
	state.mem[state.reg.s6 + state.reg.r2 + (0x3F<<1)+1] = 0x00|0;

	a.execute(state);
	expect(a.name).toBe("lhs");
	expect(a.binary[0]).toBe(0xA82223F | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.r1).toBe(0xFFFFFF00 | 0);
});
test("Lhl instruction", () => {
	let a, state = JSON.parse(JSON.stringify(initial_state));
	a = new LDT.Lhl({
		pred: 1,
		rd: "r1",
		ra: "r2",
		imm: 0x3F
	});

	state.mem[state.reg.r2 + (0x3F<<1)+0] = 0xFF|0;
	state.mem[state.reg.r2 + (0x3F<<1)+1] = 0x00|0;

	a.execute(state);
	expect(a.name).toBe("lhl");
	expect(a.binary[0]).toBe(0xA8222BF | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.r1).toBe(0xFFFFFF00 | 0);
});
test("Lhc instruction", () => {
	let a, state = JSON.parse(JSON.stringify(initial_state));
	a = new LDT.Lhc({
		pred: 1,
		rd: "r1",
		ra: "r2",
		imm: 0x3F
	});

	state.mem[state.reg.r2 + (0x3F<<1)+0] = 0xFF|0;
	state.mem[state.reg.r2 + (0x3F<<1)+1] = 0x00|0;

	a.execute(state);
	expect(a.name).toBe("lhc");
	expect(a.binary[0]).toBe(0xA82233F | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.r1).toBe(0xFFFFFF00 | 0);
});
test("Lhm instruction", () => {
	let a, state = JSON.parse(JSON.stringify(initial_state));
	a = new LDT.Lhm({
		pred: 1,
		rd: "r1",
		ra: "r2",
		imm: 0x3F
	});
	state.mem[state.reg.r2 + (0x3F<<1)+0] = 0xFF|0;
	state.mem[state.reg.r2 + (0x3F<<1)+1] = 0x00|0;

	a.execute(state);
	expect(a.name).toBe("lhm");
	expect(a.binary[0]).toBe(0xA8223BF | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.r1).toBe(0xFFFFFF00 | 0);
});
test("Lbs instruction", () => {
	let a, state = JSON.parse(JSON.stringify(initial_state));
	a = new LDT.Lbs({
		pred: 1,
		rd: "r1",
		ra: "r2",
		imm: 0x3F
	});

	state.mem[state.reg.s6 + state.reg.r2 + (0x3F)]   = 0x80|0;

	a.execute(state);
	expect(a.name).toBe("lbs");
	expect(a.binary[0]).toBe(0xA82243F | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.r1).toBe(0xFFFFFF80 | 0);
});
test("Lbl instruction", () => {
	let a, state = JSON.parse(JSON.stringify(initial_state));
	a = new LDT.Lbl({
		pred: 1,
		rd: "r1",
		ra: "r2",
		imm: 0x3F
	});
	state.mem[state.reg.r2 + (0x3F)]   = 0x80|0;

	a.execute(state);
	expect(a.name).toBe("lbl");
	expect(a.binary[0]).toBe(0xA8224BF | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.r1).toBe(0xFFFFFF80 | 0);
});
test("Lbc instruction", () => {
	let a, state = JSON.parse(JSON.stringify(initial_state));
	a = new LDT.Lbc({
		pred: 1,
		rd: "r1",
		ra: "r2",
		imm: 0x3F
	});
	state.mem[state.reg.r2 + (0x3F)] = 0x80|0;
	a.execute(state);
	expect(a.name).toBe("lbc");
	expect(a.binary[0]).toBe(0xA82253F | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.r1).toBe(0xFFFFFF80 | 0);
});
test("Lbm instruction", () => {
	let a, state = JSON.parse(JSON.stringify(initial_state));
	a = new LDT.Lbm({
		pred: 1,
		rd: "r1",
		ra: "r2",
		imm: 0x3F
	});
	state.mem[state.reg.r2 + (0x3F)] = 0x80|0;
	a.execute(state);
	expect(a.name).toBe("lbm");
	expect(a.binary[0]).toBe(0xA8225BF | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.r1).toBe(0xFFFFFF80 | 0);
});
test("Lhus instruction", () => {
	let a, state = JSON.parse(JSON.stringify(initial_state));
	a = new LDT.Lhus({
		pred: 1,
		rd: "r1",
		ra: "r2",
		imm: 0x3F
	});

	state.mem[state.reg.s6 + state.reg.r2 + (0x3F<<1)+0] = 0xFF|0;
	state.mem[state.reg.s6 + state.reg.r2 + (0x3F<<1)+1] = 0x69|0;

	a.execute(state);
	expect(a.name).toBe("lhus");
	expect(a.binary[0]).toBe(0xA82263F | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.r1).toBe(0xFF69 | 0);
});
test("Lhul instruction", () => {
	let a, state = JSON.parse(JSON.stringify(initial_state));
	a = new LDT.Lhul({
		pred: 1,
		rd: "r1",
		ra: "r2",
		imm: 0x3F
	});

	state.mem[state.reg.r2 + (0x3F<<1)+0] = 0xFF|0;
	state.mem[state.reg.r2 + (0x3F<<1)+1] = 0x69|0;
	a.execute(state);
	expect(a.name).toBe("lhul");
	expect(a.binary[0]).toBe(0xA8226BF | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.r1).toBe(0xFF69 | 0);
});
test("Lhuc instruction", () => {
	let a, state = JSON.parse(JSON.stringify(initial_state));
	a = new LDT.Lhuc({
		pred: 1,
		rd: "r1",
		ra: "r2",
		imm: 0x3F
	});
	state.mem[state.reg.r2 + (0x3F<<1)+0] = 0xFF|0;
	state.mem[state.reg.r2 + (0x3F<<1)+1] = 0x69|0;
	a.execute(state);
	expect(a.name).toBe("lhuc");
	expect(a.binary[0]).toBe(0xA82273F | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.r1).toBe(0xFF69 | 0);
});
test("Lhum instruction", () => {
	let a, state = JSON.parse(JSON.stringify(initial_state));
	a = new LDT.Lhum({
		pred: 1,
		rd: "r1",
		ra: "r2",
		imm: 0x3F
	});
	state.mem[state.reg.r2 + (0x3F<<1)+0] = 0xFF|0;
	state.mem[state.reg.r2 + (0x3F<<1)+1] = 0x69|0;
	a.execute(state);
	expect(a.name).toBe("lhum");
	expect(a.binary[0]).toBe(0xA8227BF | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.r1).toBe(0xFF69 | 0);
});
test("Lbus instruction", () => {
	let a, state = JSON.parse(JSON.stringify(initial_state));
	a = new LDT.Lbus({
		pred: 1,
		rd: "r1",
		ra: "r2",
		imm: 0x3F
	});
	state.mem[state.reg.s6 + state.reg.r2 + (0x3F)] = 0xFF|0;
	a.execute(state);
	expect(a.name).toBe("lbus");
	expect(a.binary[0]).toBe(0xA82283F | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.r1).toBe(0x000000FF | 0);
});
test("Lbul instruction", () => {
	let a, state = JSON.parse(JSON.stringify(initial_state));
	a = new LDT.Lbul({
		pred: 1,
		rd: "r1",
		ra: "r2",
		imm: 0x3F
	});
	state.mem[state.reg.r2 + (0x3F)] = 0xFF|0;
	a.execute(state);
	expect(a.name).toBe("lbul");
	expect(a.binary[0]).toBe(0xA8228BF | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.r1).toBe(0x000000FF | 0);
});
test("Lbuc instruction", () => {
	let a, state = JSON.parse(JSON.stringify(initial_state));
	a = new LDT.Lbuc({
		pred: 1,
		rd: "r1",
		ra: "r2",
		imm: 0x3F
	});
	state.mem[state.reg.r2 + (0x3F)] = 0xFF|0;
	a.execute(state);
	expect(a.name).toBe("lbuc");
	expect(a.binary[0]).toBe(0xA82293F | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.r1).toBe(0x000000FF | 0);
});
test("Lbum instruction", () => {
	let a, state = JSON.parse(JSON.stringify(initial_state));
	a = new LDT.Lbum({
		pred: 1,
		rd: "r1",
		ra: "r2",
		imm: 0x3F
	});
	state.mem[state.reg.r2 + (0x3F)] = 0xFF|0;
	a.execute(state);
	expect(a.name).toBe("lbum");
	expect(a.binary[0]).toBe(0xA8229BF | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.r1).toBe(0x000000FF | 0);
});