/* eslint-disable no-undef */
import * as M from "../work_logic/Instructions/Multiply/index";
let initial_state = {
    reg: {
        s2: 0,
        s3: 0,
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

test("Mul instructions", () => {
    let a, e, state = JSON.parse(JSON.stringify(initial_state));
    state.reg.r2 = 0x0FFFFFFF;
    state.reg.r3 = 0x0FFFFFFF;
    a = new M.Mul({
        pred: 1,
        rs1: "r2",
        rs2: "r3"
    });
    a.execute(state);
    expect(a.name).toBe("mul");
    expect(a.binary[0]).toBe(0x0A0021A0 | 0);
    expect(a.binary[1]).toBe(undefined);
    expect(state.reg.s2).toBe(0xE0000001|0);
    expect(state.reg.s3).toBe(0x00ffffff|0);
});

test("Mulu instructions", () => {
    let a, e, state = JSON.parse(JSON.stringify(initial_state));
    state.reg.r2 = -1;
    state.reg.r3 = -1;
    a = new M.Mulu({
        pred: 1,
        rs1: "r2",
        rs2: "r3"
    });
    a.execute(state);
    expect(a.name).toBe("mulu");
    expect(a.binary[0]).toBe(0x0A0021A1|0);
    expect(a.binary[1]).toBe(undefined);
    expect(state.reg.s2).toBe(0x1>>>0);
    expect(state.reg.s3).toBe(0xFFFFFFFE>>>0);
});