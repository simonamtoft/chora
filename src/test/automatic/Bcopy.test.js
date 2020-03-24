/* eslint-disable no-undef */
import Bcopy from "../../work_logic/Instructions/Bcopy";
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
	}
};
for (let i = 0; i < 32; i++)
	initial_state.reg["r" + i] = i;

test("Bcopy instruction", () => {
	let a, e, state = JSON.parse(JSON.stringify(initial_state));
	a = new Bcopy({
		pred: 1,
		rd: "r1",
		rs1: "r2",
		imm: 3,
		ps: "p3"
	});
	a.execute(state);
	expect(a.name).toBe("bcopy");
	expect(a.binary[0]).toBe(0x0A0221D3 | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.r1).toBe(2 | 0);

	state.reg.p3 = 1;
	a.execute(state);
	expect(state.reg.r1).toBe(10 | 0);
});