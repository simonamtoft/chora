import { render } from "@testing-library/react";
import React from "react";

export const parseNum = (input) => typeof input == "number" ? input : Number(input);
export const parseReg = (input) => typeof input == "number" ? input : Number(input.match(/\d+/i)[0]);
export const toUint32 = (n) => n >>> 0;
export const toInt32 = (n) => n | 0;
export const parseInputInst = (inst) => {
	let parsedInst = inst.trim();
	parsedInst = parsedInst.replace("=", "");
	let [type, des, s1, s2] = parsedInst.split(/[ 	,]+/);
	return [type, des, s1, s2];
}