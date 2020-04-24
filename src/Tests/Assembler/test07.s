#
# Expected Result
#		s2 = 35		(sl)
#

		.word   32;
		addi    r1  = r0 , 5	||	addi    r2  = r0 , 7;
		mul  	r1, r2;
		halt;
		nop;
		nop;
		nop;
