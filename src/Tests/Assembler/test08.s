#
# Expected Result
#		sl = 35	(s2)
#		r1 = 5
#		r2 = 7
#		r3 = 35
#		r4 = 35  
#		r5 = 35
#

		.word   44;
		addi    r1  = r0 , 5	||	addi	r2 = r0 , 7;
		mul 	r1, r2	;
		mfs     r3  = s2;
		mfs     r4  = s2;
		mfs     r5  = s2;
		halt;
		nop;
		nop;
		nop;
