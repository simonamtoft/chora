/* eslint-disable no-undef */
import * as LDT from "../work_logic/Instructions/LoadTyped";
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
    gm: {}
};
for (let i = 0; i < 32; i++)
    initial_state.reg["r" + i] = i;
for (let i = 0; i < 16; i++)
    initial_state.reg["s" + i] = i;

test("Lws instruction", () => {
    let a, e, state = JSON.parse(JSON.stringify(initial_state));
    a = new LDT.Lws({
        pred: 1,
        rd: "r1",
        ra: "r2",
        imm: 0x3F
    });
    state.sc[state.reg.r2 + (0x3F<<2)] = 0xFFFFFFFF|0;
    a.execute(state);
    expect(a.name).toBe("lws");
    expect(a.binary[0]).toBe(0xA82203F | 0);
    expect(a.binary[1]).toBe(undefined);
    expect(state.reg.r1).toBe(0xFFFFFFFF | 0);
});
test("Lwl instruction", () => {
    let a, e, state = JSON.parse(JSON.stringify(initial_state));
    a = new LDT.Lwl({
        pred: 1,
        rd: "r1",
        ra: "r2",
        imm: 0x3F
    });
    state.lm[state.reg.r2 + (0x3F<<2)] = 0xFFFFFFFF|0;
    a.execute(state);
    expect(a.name).toBe("lwl");
    expect(a.binary[0]).toBe(0xA8220BF | 0);
    expect(a.binary[1]).toBe(undefined);
    expect(state.reg.r1).toBe(0xFFFFFFFF | 0);
});
test("Lwc instruction", () => {
    let a, e, state = JSON.parse(JSON.stringify(initial_state));
    a = new LDT.Lwc({
        pred: 1,
        rd: "r1",
        ra: "r2",
        imm: 0x3F
    });
    state.dc[state.reg.r2 + (0x3F<<2)] = 0xFFFFFFFF|0;
    a.execute(state);
    expect(a.name).toBe("lwc");
    expect(a.binary[0]).toBe(0xA82213F | 0);
    expect(a.binary[1]).toBe(undefined);
    expect(state.reg.r1).toBe(0xFFFFFFFF | 0);
});
test("Lwm instruction", () => {
    let a, e, state = JSON.parse(JSON.stringify(initial_state));
    a = new LDT.Lwm({
        pred: 1,
        rd: "r1",
        ra: "r2",
        imm: 0x3F
    });
    state.gm[state.reg.r2 + (0x3F<<2)] = 0xFFFFFFFF|0;
    a.execute(state);
    expect(a.name).toBe("lwm");
    expect(a.binary[0]).toBe(0xA8221BF | 0);
    expect(a.binary[1]).toBe(undefined);
    expect(state.reg.r1).toBe(0xFFFFFFFF | 0);
});
test("Lhs instruction", () => {
    let a, e, state = JSON.parse(JSON.stringify(initial_state));
    a = new LDT.Lhs({
        pred: 1,
        rd: "r1",
        ra: "r2",
        imm: 0x3F
    });
    state.sc[state.reg.r2 + (0x3F<<1)] = 0xFFFFFFFF|0;
    a.execute(state);
    expect(a.name).toBe("lhs");
    expect(a.binary[0]).toBe(0xA82223F | 0);
    expect(a.binary[1]).toBe(undefined);
    expect(state.reg.r1).toBe(0x0000FFFF | 0);
});
test("Lhl instruction", () => {
    let a, e, state = JSON.parse(JSON.stringify(initial_state));
    a = new LDT.Lhl({
        pred: 1,
        rd: "r1",
        ra: "r2",
        imm: 0x3F
    });
    state.lm[state.reg.r2 + (0x3F<<1)] = 0xFFFFFFFF|0;
    a.execute(state);
    expect(a.name).toBe("lhl");
    expect(a.binary[0]).toBe(0xA8222BF | 0);
    expect(a.binary[1]).toBe(undefined);
    expect(state.reg.r1).toBe(0x0000FFFF | 0);
});
test("Lhc instruction", () => {
    let a, e, state = JSON.parse(JSON.stringify(initial_state));
    a = new LDT.Lhc({
        pred: 1,
        rd: "r1",
        ra: "r2",
        imm: 0x3F
    });
    state.dc[state.reg.r2 + (0x3F<<1)] = 0xFFFFFFFF|0;
    a.execute(state);
    expect(a.name).toBe("lhc");
    expect(a.binary[0]).toBe(0xA82233F | 0);
    expect(a.binary[1]).toBe(undefined);
    expect(state.reg.r1).toBe(0x0000FFFF | 0);
});
test("Lhm instruction", () => {
    let a, e, state = JSON.parse(JSON.stringify(initial_state));
    a = new LDT.Lhm({
        pred: 1,
        rd: "r1",
        ra: "r2",
        imm: 0x3F
    });
    state.gm[state.reg.r2 + (0x3F<<1)] = 0xFFFFFFFF|0;
    a.execute(state);
    expect(a.name).toBe("lhm");
    expect(a.binary[0]).toBe(0xA8223BF | 0);
    expect(a.binary[1]).toBe(undefined);
    expect(state.reg.r1).toBe(0x0000FFFF | 0);
});
test("Lbs instruction", () => {
    let a, e, state = JSON.parse(JSON.stringify(initial_state));
    a = new LDT.Lbs({
        pred: 1,
        rd: "r1",
        ra: "r2",
        imm: 0x3F
    });
    state.sc[state.reg.r2 + (0x3F)] = 0xFFFFFFFF|0;
    a.execute(state);
    expect(a.name).toBe("lbs");
    expect(a.binary[0]).toBe(0xA82243F | 0);
    expect(a.binary[1]).toBe(undefined);
    expect(state.reg.r1).toBe(0x000000FF | 0);
});
test("Lbl instruction", () => {
    let a, e, state = JSON.parse(JSON.stringify(initial_state));
    a = new LDT.Lbl({
        pred: 1,
        rd: "r1",
        ra: "r2",
        imm: 0x3F
    });
    state.lm[state.reg.r2 + (0x3F)] = 0xFFFFFFFF|0;
    a.execute(state);
    expect(a.name).toBe("lbl");
    expect(a.binary[0]).toBe(0xA8224BF | 0);
    expect(a.binary[1]).toBe(undefined);
    expect(state.reg.r1).toBe(0x000000FF | 0);
});
test("Lbc instruction", () => {
    let a, e, state = JSON.parse(JSON.stringify(initial_state));
    a = new LDT.Lbc({
        pred: 1,
        rd: "r1",
        ra: "r2",
        imm: 0x3F
    });
    state.dc[state.reg.r2 + (0x3F)] = 0xFFFFFFFF|0;
    a.execute(state);
    expect(a.name).toBe("lbc");
    expect(a.binary[0]).toBe(0xA82253F | 0);
    expect(a.binary[1]).toBe(undefined);
    expect(state.reg.r1).toBe(0x000000FF | 0);
});
test("Lbm instruction", () => {
    let a, e, state = JSON.parse(JSON.stringify(initial_state));
    a = new LDT.Lbm({
        pred: 1,
        rd: "r1",
        ra: "r2",
        imm: 0x3F
    });
    state.gm[state.reg.r2 + (0x3F)] = 0xFFFFFFFF|0;
    a.execute(state);
    expect(a.name).toBe("lbm");
    expect(a.binary[0]).toBe(0xA8225BF | 0);
    expect(a.binary[1]).toBe(undefined);
    expect(state.reg.r1).toBe(0x000000FF | 0);
});