/* eslint-disable no-undef */
import * as P from "../work_logic/Instructions/Predicate/index";
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

test("Por instructions", () => {
    let a, e, state = JSON.parse(JSON.stringify(initial_state));
    a = new P.Por({
        pred: 1,
        pd: "p1",
        ps1: "p2",
        ps2: "p3"
    });
    a.execute(state);
    expect(a.name).toBe("por");
    expect(a.binary[0]).toBe(0x0A0221C6 | 0);
    expect(a.binary[1]).toBe(undefined);
    expect(state.reg.p1).toBe(0 | 0);

    state.reg.p2 = 1;
    a.execute(state);
    expect(state.reg.p1).toBe(1 | 0);

    state.reg.p3 = 1;
    a.execute(state);
    expect(state.reg.p1).toBe(1 | 0);
});

test("Pand instructions", () => {
    let a, e, state = JSON.parse(JSON.stringify(initial_state));
    a = new P.Pand({
        pred: 1,
        pd: "p1",
        ps1: "p2",
        ps2: "p3"
    });
    a.execute(state);
    expect(a.name).toBe("pand");
    expect(a.binary[0]).toBe(0x0A0221C7 | 0);
    expect(a.binary[1]).toBe(undefined);
    expect(state.reg.p1).toBe(0 | 0);

    state.reg.p2 = 1;
    a.execute(state);
    expect(state.reg.p1).toBe(0 | 0);

    state.reg.p3 = 1;
    a.execute(state);
    expect(state.reg.p1).toBe(1 | 0);
});

test("Pxor instructions", () => {
    let a, e, state = JSON.parse(JSON.stringify(initial_state));
    a = new P.Pxor({
        pred: 1,
        pd: "p1",
        ps1: "p2",
        ps2: "p3"
    });
    a.execute(state);
    expect(a.name).toBe("pxor");
    expect(a.binary[0]).toBe(0x0A0221CA | 0);
    expect(a.binary[1]).toBe(undefined);
    expect(state.reg.p1).toBe(0 | 0);

    state.reg.p2 = 1;
    a.execute(state);
    expect(state.reg.p1).toBe(1 | 0);

    state.reg.p3 = 1;
    a.execute(state);
    expect(state.reg.p1).toBe(0 | 0);
});