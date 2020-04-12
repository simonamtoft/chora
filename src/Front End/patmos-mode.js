import CodeMirror from "codemirror";

((mod) => {
	mod(CodeMirror);
}) ((CodeMirror) => {
	"use strict";

	// declare global: JSHINT!!!

	CodeMirror.defineMode("patmos", (config, parserConfig) => {
		let regexFromWords = (words, ins) => {
			return new RegExp("^(?:" + words.join("|") + ")$", ins);
		};

		let instTypes = regexFromWords([
		/* Normal Instructions */
		// BA
			"add", "addi", "addl", "sub", "subi", "subl", "xor", "xori", "xorl", "sl", "sli", "sll",
			"sr", "sri", "srl", "sra", "srai", "sral", "nor", "norl", "shadd", "shadd2",
			// Compare
			"btest", "btesti", "cmpeq", "cmpeqi", "cmple", "cmplei", "cmplt", "cmplti", 
			"cmpneq", "cmpneqi", "cmpule", "cmpulei", "cmpult", "cmpulti",
			// Load
			"lbc", "lbl", "lbm", "lbs", "lbuc", "lbul", "lbum", "lbus", "lhc", "lhl", 
			"lhm", "lhs", "lhuc", "lhul", "lhum", "lhus", "lwc", "lwl", "lwm", "lws",
			// Store
			"sbc", "sbl", "sbm", "sbs", "shc", "shl", "shm", "shs", "swc", "swl", "swm", "sws",
			// Multiply
			"mul", "mulu", 
			// Stack Control
			"sens", "sfree", "sres", "sspill",
			// Predicate
			"pand", "por", "pxor",
			// Move types
			"mts", "mfs",
			// Control Flow
			"callnd", "call", "brnd", "br", "brcfnd", "brcf", "trap",
			"retnd", "ret", "xretnd", "xret",
			// Bit copy
			"bcopy",

			/* Pseudo Instructions */
			"mov", "clr", "neg", "not", "li", "nop", "isodd", "pmov", "pnot", "pset", "pclr",
		], "i");

		let registers = regexFromWords([
		// General-purpose
			"r0", "r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8", "r9", "r10", 
			"r11", "r12", "r13", "r14", "r15", "r16", "r17", "r18", "r19", "r20", 
			"r21", "r22", "r23", "r24", "r25", "r26", "r27", "r28", "r29", "r30", "r31",
			// Predicate
			"p0", "p1", "p2", "p3", "p4", "p5", "p6", "p7",
			// Special-purpose
			"s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", 
			"s10", "s11", "s12", "s13", "s14", "s15",
			// Special names
			"sl", "sh", "ss", "st", "srb", "sro", "sxb", "sxo",
		], "");

		let keywords = regexFromWords([".word"], "i");

		let normal = (stream, state) => {
			let ch = stream.next();

			// Eat entire comment
			if (ch === "#") {
				stream.skipToEnd();
				return "comment";
			}
		
			// Eat all digits of number
			if (/\d/.test(ch)) {
				stream.eatWhile(/[\w.%]/);
				return "number";
			}

			// Eat all characters of register / keyword
			if (/[.\w_]/.test(ch)) {
				stream.eatWhile(/[\w\\\-_.]/);
				return "variable";
			}

			return null;
		};

		return {
			startState: (basecol) => {
				return { basecol: basecol || 0, indentDepth: 0, cur: normal };
			},

			token: (stream, state) => {
				if (stream.eatSpace()) return null;
				let style = state.cur(stream, state);
				let word = stream.current();

				// Use different colors for types, registers and keywords
				if (style === "variable") {
					if (keywords.test(word)) style = "keyword";
					else if (instTypes.test(word)) style = "builtin";
					else if (registers.test(word)) style = "variable-2";
				}
				return style;
			}
		};
	});

	// inspiration from codemirror.net/addon/lint/javascript-lint.js 
	// let validator = (text, options) => {
	// 	if(!window.JSHINT) {
	// 		if (window.console) {
	// 			window.console.error("Error: window. not defined, CodeMirror Patmos-mode linting cannot run.");
	// 		}
	// 		return [];
	// 	}
	// 	if (!options.indent) // JSHint error.character actually is a column index, this fixes underlining on lines using tabs for indentation
	// 		options.indent = 1; // JSHint default value is 4
	// 	JSHINT(text, options, options.globals);
	// 	let errors = JSHINT.data().errors, result = [];
	// 	if (errors) parseErrors(errors, result);
	// 	return result;
	// };

	// let parseErrors = (errors, output) => {
	// 	for ( let i = 0; i < errors.length; i++) {
	// 		let error = errors[i];
	// 		if (error) {
	// 			if (error.line <= 0) {
	// 				if (window.console)
	// 					window.console.warn("Cannot display JSHint error (invalid line " + error.line + ")", error);
	// 				continue;
	// 			}

	// 			let start = error.character - 1, end = start + 1;
				
	// 			if (error.evidence) {
	// 				let index = error.evidence.substring(start).search(/.\b/);
	// 				if (index > -1) end += index;
	// 			}

	// 			// Convert to format expected by validation service
	// 			output.push({
	// 				message: error.reason,
	// 				severity: error.code ? (error.code.startsWith('W') ? "warning" : "error") : "error",
	// 				from: CodeMirror.Pos(error.line - 1, start),
	// 				to: CodeMirror.Pos(error.line - 1, end)
	// 			});
	// 		}
	// 	}
	// };

	// CodeMirror.registerHelper("lint", "patmos", validator);
});
  