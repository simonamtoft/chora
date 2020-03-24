/* eslint-disable no-undef */
import Mts from "../../work_logic/Instructions/Mts";
let initial_state = {
	reg: {
		p0: 1,
		p1: 0,
		p2: 0,
		p3: 0,
		p4: 0,
		p5: 0,
		p6: 0,
		p7: 0,
		// gonna be lazy with s registers.
		s1: 0,
		s2: 0,
		s3: 0,
		s4: 0
	}
};
for (let i = 0; i < 32; i++)
	initial_state.reg["r" + i] = i;

test("Mts instruction", () => {
	let a, e, state = JSON.parse(JSON.stringify(initial_state));
	a = new Mts({
		pred: 1,
		rs1: "r1",
		sd: "s1"
	});
	a.execute(state);
	expect(a.name).toBe("mts");
	expect(a.binary[0]).toBe(0x0A401021 | 0);
	expect(a.binary[1]).toBe(undefined);
	expect(state.reg.s1).toBe(1 | 0);

	a = new Mts({
		pred: 1,
		rs1: "r31",
		sd: "s3"
	});
	a.execute(state);
	expect(a.binary[0]).toBe(0x0A41F023 | 0);
	expect(state.reg.s3).toBe(31 | 0);
});