#
# Expected Result: 
#		only 2 blocks spilled instead of 20
#		r1 = 0x00001CCB
#		r2 = 0x00400000
#		r3 = 0x00500000
#		r4 = 0x00400000
#		r5 = 0x00500000
#		s5 = 0x00001CCB
#		s6 = 0x00001CCB
#		s7 = 4
#		s8 = 84
#		p-reg = 00000011
#

		.word   184;
# initialize the stack cache registers: stack top and mem top
test:   addi    r1  = r0, 0x999;
		addi    r1  = r1, 0x999;
		addi    r1  = r1, 0x999;
		mts     s5 = r1;
		mts     s6 = r1;
		addi	r30 = r0, test;
# function x
		sres    2;
		add      r2 = r0, 0x400000;
		add      r3 = r0, 0x500000;
		nop;
# store to the reserved words
		sws      [r0 + 0] = r2;
		sws      [r0 + 1] = r3;
		addi     r10  = r0 , 10;
# blocks are spilled only once
loop:	lws      r4 = [r0 + 0];
		lws      r5 = [r0 + 1];
		call 	 foo;
		subi     r10 = r10 , 1;
 		nop;
		nop;
		nop;
		sens     2;
		cmpeq    p1  = r10 , r0;
(!p1) 	br       loop;
		nop;
		nop;
		sfree    2;
		halt;
		nop;
		nop;
		nop;
		.word    44; 
foo:	sres     512;
		sws      [r0 + 3] = r2;
		sws      [r0 + 4] = r3;
		nop;
		nop;
		nop;
		sfree    512;
		ret;
		nop;
		nop;
		nop;
