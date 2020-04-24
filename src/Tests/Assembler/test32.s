#
# Expected Result: 
#		r1 = 48
#		r2 = 48
#

		.word   68;
		nop;
		addi    r1 = r0, x;
		nop;
		brcfr   r1, r0;
		nop;
		nop;
		halt;
		nop;
		nop;
		nop;
		.word   52;
x:      add     r2 = r0, r1;
		halt;
		nop;
		nop;
		nop;
