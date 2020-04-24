#
# Expected Result
#		r1 = 5
#		r2 = 7
#		r3 = 12
#		r4 = 0
#		p-reg = 00000011
#

		.word   44;
		addi    r1  = r0 , 5    ||			addi    r2  = r0 , 7;
		cmplt   p1  = r1, r2    ||  		cmpeq   p2  = r1, r2;
(p2) 	add     r4  = r1, r2    ||  (p1) 	add     r3  = r1, r2;
		halt;
		nop;
		nop;
		nop;
