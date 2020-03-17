# Chora
A JavaScript simulator of the [Patmos ISA](http://patmos.compute.dtu.dk/), developed by Marc Sun Bøg & Simon Amtoft Pedersen as a part of their bachelor project at the Technical University of Denmark (DTU), advised by [Martin Schoeberl](https://www.imm.dtu.dk/~masca/) from DTU Compute. 

# Instruction list
| Name   | Example         |
| -------|:---------------:|
| Add    | add r1 = r2, r3 |
| Sub    | sub r1 = r2, r3 |


# Instruction input format

| Type   | Rd   | Rs1   | Rs2/Imm |
| -------|:----:|:-----:| -------:|
| add    | r1 = | r2,   | r3      |
|        |      |       |         |
|        |      |       |         |



# To-Do
1. Fix all load/store instructions.
    1. Implement StackControl with a proper StackCache.
2. Implement assembler: [Assembler Example](https://softwareengineering.stackexchange.com/questions/324587/write-an-assembler-in-c-why-writing-a-machine-code-translator-for-a-low-level)
3. Prettify GUI (CSS and CodeMirror)

# Notes to self
1. When parsing and running ASM, make sure to check the predicate (E.g. (!p6) addi r1 = r0, 255 should only run if p6 is false and it should pass pred: 0b1110 for machine code representation)
2. Implement pseudo instructions in parser
