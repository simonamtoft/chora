/* eslint-disable no-undef */
import Add from "./Add";

let mock_state = {
    reg: {
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

test("Add instructions", () => {
    // lazy deep-copy
    let state = JSON.parse(JSON.stringify(mock_state));
    let a;
    let e;

    a = new Add({
        pred: 1,
        rd: "r1",
        rs1: "r2",
        op2: 0x0FFF
    });
    e = state.reg.r2 + 0x0FFF;

    a.execute(state);
    expect(a.type).toBe("addi");
    expect(a.binary[0]).toBe(0x08022FFF);
    expect(a.binary[1]).toBe(undefined);
    expect(state.reg.r1).toBe(e);

    a = new Add({
        pred: 1,
        rd: "r1",
        rs1: "r1",
        op2: "r3"
    });
    e = state.reg.r1 + state.reg.r3;
    a.execute(state);
    expect(a.type).toBe("add");
    expect(a.binary[0]).toBe(0xA021180);
    expect(a.binary[1]).toBe(undefined);
    expect(state.reg.r1).toBe(e);

    a = new Add({
        pred: 1,
        rd: "r1",
        rs1: "r2",
        op2: 0xFFFF
    });
    e = state.reg.r2 + 0xFFFF;
    a.execute(state);
    expect(a.type).toBe("addl");
    expect(a.binary[0]).toBe(0x0FC22000);
    expect(a.binary[1]).toBe(0xFFFF);
    expect(state.reg.r1).toBe(e);
});