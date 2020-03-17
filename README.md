# Chora
A JavaScript simulator of the [Patmos ISA](http://patmos.compute.dtu.dk/), developed by Marc Sun Bøg & Simon Amtoft Pedersen as a part of their bachelor project at the Technical University of Denmark (DTU), advised by [Martin Schoeberl](https://www.imm.dtu.dk/~masca/) from DTU Compute. 

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
1. Fix all load/store instructions.
    1. Implement StackControl with a proper StackCache.
2. Implement assembler: [Assembler Example](https://softwareengineering.stackexchange.com/questions/324587/write-an-assembler-in-c-why-writing-a-machine-code-translator-for-a-low-level)
3. Prettify GUI (CSS and CodeMirror)
4. Disable run/step if no instructions left to execute.
5. Disable reset when no instructions have run yet.
    1. When prev works, also disable that when no instructions has run.

# Notes to self
1. When parsing and running ASM, make sure to check the predicate (E.g. (!p6) addi r1 = r0, 255 should only run if p6 is false and it should pass pred: 0b1110 for machine code representation)
2. Implement pseudo instructions in parser
