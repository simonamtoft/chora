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
    
# Note to self
- Should/can mov move a value > 1 into p-reg?
- Should we store instructions in memory?
- When writing to predicate register file AND with 0b0111. (page 16 Handbook)
- Compiler generated nops. Load worked in old files.
- Check register usage in Handbook. Should some registers not be write-able?
- Make some instructions unable to be run on second path.
