/* eslint-disable no-undef */
import Mfs from "../work_logic/Instructions/Mfs";
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
        s1: 1,
        s2: 2,
        s3: 3,
        s4: 4
    }
};
for (let i = 0; i < 32; i++)
    initial_state.reg["r" + i] = i;

test("Mfs instruction", () => {
    let a, e, state = JSON.parse(JSON.stringify(initial_state));
    a = new Mfs({
        pred: 1,
        rd: "r1",
        ss: "s1"
    });
    a.execute(state);
    expect(a.name).toBe("mfs");
    expect(a.binary[0]).toBe(0x0A420031 | 0);
    expect(a.binary[1]).toBe(undefined);
    expect(state.reg.r1).toBe(1 | 0);

    a = new Mfs({
        pred: 1,
        rd: "r31",
        ss: "s3"
    });
    a.execute(state);
    expect(a.binary[0]).toBe(0x0A7E0033 | 0);
    expect(state.reg.s3).toBe(3 | 0);
});