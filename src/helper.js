export const parseNum = (input) => typeof input == "number" ? input : Number(input);
export const parseReg = (input) => typeof input == "number" ? input : Number(input.match(/\d+/i)[0]);
export const toUint32 = (n) => n >>> 0;
export const toInt32 = (n) => n | 0;
export const intToHex = (integer) => {
	integer = Number(integer);

	if (integer < 0) {
		integer = 0xFFFFFFFF + integer + 1;
	}
	return `0x${integer.toString(16).toUpperCase().padStart(8, "0")}`;
};
