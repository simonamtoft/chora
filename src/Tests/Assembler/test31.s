#
# Expected Result: r2 = 52
#

		.word   x-f
f:      lwc     r1 = [r0 + x];
		nop;
		nop;
		brcfr   r1, r0;
		nop;
		nop;
		nop;
		halt;	
		nop;
		nop;
		nop;
x:      .word   y
y:      add     r2 = r0, r1
		halt
		nop	
		nop
		nop
