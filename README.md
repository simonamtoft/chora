# Chora
A JavaScript simulator of the [Patmos ISA](http://patmos.compute.dtu.dk/), developed by Marc Sun Bøg & Simon Amtoft Pedersen as a part of their bachelor project at the Technical University of Denmark (DTU), advised by [Martin Schoeberl](https://www.imm.dtu.dk/~masca/) from DTU Compute. 

# Pseudo instructions
| Pseudo code        | Basic code           |
| -------------------|----------------------|
| mov Rd = Rs        | add Rd = Rs, 0       |
| clr Rd             | add Rd = R0, 0       |
| neg Rd = -Rs       | sub Rd = r0, Rs      |
| not Rd = ~Rs       | nor Rd = Rs, r0      |
| li Rd = imm (pos)  | add Rd = r0, imm     |
| li Rd = imm (neg)  | sub Rd = r0, imm     |
| nop                | sub r0 = r0, 0       |
| isodd Pd = Rs1     | btest Pd = Rs1, r0   |
| mov Pd = Rs        | cmpneq Pd = Rs, r0   |
| pmov Pd = Ps       | por Pd = Ps, Ps      | 
| pnot Pd = ~Ps      | pxor Pd = Ps, p0     |
| pset Pd = 1        | por Pd = p0, p0      | 
| pclr Pd = 0        | pxor Pd = p0, p0     | 
| mov Rd = Ps        | bcopy Rd = r0, 0, Ps |

Beware: nop should give binary = 0x00400000 (to distinguish from compiler-generated nops). 

# Instruction examples
| Instruction Type   | Example            |
| -------------------|:-------------------|
| Binary Arithmetics | add r1 = r2, r3    |
| Compare            | cmpneq p2 = r1, 10 |
| Load Typed         | lwc r10 = [r1 + 1] |
| Multiply           | mul r1, r2         | 
| Predicate          | pand p2 = p0, p1   |
| Stack Control      | sres 4             | 
| Store Typed        | swc [r1 + 1] = r2  |
| Bcopy              | bcopy              |
| Mfs                | mfs r8 = s6        |
| Mts                | mts s6 = r1        |

## How they put into fields
Rs are meant to represent both r-, p- and s-types, unless otherwise stated.

### Binary Arithmetics & Compare
| Instruction Type   | Type   | Rd   | Rs1   | Rs2/Imm |
| -------------------| -------|:----:|:-----:| :------:|
| Binary Arithmetics | add    | r1   | r2    | r3      |
| Compare            | cmpneq | p2   | r1    | 10      |

BinaryArithmetics stores in r-register only. 
Compare stores in p-register only.

### Load Typed
| Instruction Type   | Type   | Rd   | Rs1   | Imm   |
| -------------------| -------|:----:|:-----:|:-----:|
| Load Typed         | lwc    | r10  | r1    | 1     |

### Store Typed
| Instruction Type   | Type   | Rd   | Imm   | Rs1   |
| -------------------| -------|:----:|:-----:|:-----:|
| Store Typed        | swc    | r1   | 1     | r2    |

### Predicate
| Instruction Type   | Type   | Pd   | Ps1   | Ps2   |
| -------------------| -------|:----:|:-----:|:-----:|
| Predicate          | pand   | p2   | p0    | p1    |

Predicate only uses p-registers.

### Bit copy
| Instruction Type   | Type   | Rd   | Rs1   | Imm   | Ps    |
| -------------------| -------|:----:|:-----:|:-----:|:-----:|
| Bcopy              | bcopy  |    |     |     |       |

### Multiply
| Instruction Type   | Type   | Rs1   | Rs2   |
| -------------------| -------|:-----:|:-----:|
| Multiply           | mul    | r1    | r2    |

Multiply is stored in registers s2 and s3.  

### Move from special
| Instruction Type   | Type   | Rd    | Ss    |
| -------------------| -------|:-----:|:-----:|
| Mfs                | mfs    | r8    | s6    |

### Move to special
| Instruction Type   | Type   | Sd    | Rs    |
| -------------------| -------|:-----:|:-----:|
| Mts                | mts    | s6    | r1    |

### Stack Control
| Instruction Type   | Type   | Imm   |
| -------------------| -------|:-----:|
| Stack Control      | sres   | 4     |

Doesn't store in any register. 

# To-Do
1. Instructions 
    1. Fix all load/store instructions.
    2. Implement StackControl with a proper StackCache.
    3. Implement ControlFlow 
    4. Fix bcopy (Ps can be inverted like predicates). 
2. Implement assembler: [Assembler Example](https://softwareengineering.stackexchange.com/questions/324587/write-an-assembler-in-c-why-writing-a-machine-code-translator-for-a-low-level)
    1. Pseudocode insturction missing
    2. bcopy missing
    3. ControlFlow missing
3. Display pseudo codes in original code.
4. Prettify GUI (CSS and CodeMirror)
