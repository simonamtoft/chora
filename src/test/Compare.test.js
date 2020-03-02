/* eslint-disable no-undef */
import * as C from "../work_logic/Instructions/Compare/index";
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