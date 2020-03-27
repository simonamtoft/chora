# Chora
A JavaScript simulator of the [Patmos ISA](http://patmos.compute.dtu.dk/), developed by Marc Sun Bøg & Simon Amtoft Pedersen as a part of their bachelor project at the Technical University of Denmark (DTU), advised by [Martin Schoeberl](https://www.imm.dtu.dk/~masca/) from DTU Compute. 

# To-Do
1. Instructions 
    1. Implement StackControl ~~with a proper StackCache~~.
    2. Implement ControlFlow
        1. Figure out how to make the delay slots work...
2. Implement assembler: [Assembler Example](https://softwareengineering.stackexchange.com/questions/324587/write-an-assembler-in-c-why-writing-a-machine-code-translator-for-a-low-level)
    1. ControlFlow missing (stack?)
    2. Change basic code when using registers and i/l type.
    3. Check length of immediate and throw error if too long... 
4. Prettify GUI (CSS and CodeMirror)
5. Fix all the copy pasta JSDoc
6. Fix Special-purpose registers
    1. store p7...p0 in s0
    2. Fix access through names e.g. "sl" for s2. etc.

# Note to self
- Do we want error check of predicate in assembler.parse()?
- Don't think mov should be able to move a register value bigger than 1 into p-reg.
- Store instruction queue in instruction cache instead? 
- When writing to predicate register file AND with 0b0111. (page 16 Handbook)
- Implemented compiler generated nops. Is this a good idea?
- Should there also be nops after a store in some cases?
- Check up on $ before registers in editor... Ask Martin.
- Check register usage. Should some registers not be write-able?
- Remember to keep writing r0 = 0, p0 = 1 after each instruction execute.
