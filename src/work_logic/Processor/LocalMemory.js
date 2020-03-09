class LocalMemory {
    constructor() {
        this.sc = {};
        this.gm = {};
        this.lm = {};
        this.dc = {};
    }

    resetCache() {
		this.sc = {};
		this.gm = {};
        this.lm = {};
        this.dc = {};
	}

	writeSc(address, value) {
        this.sc[address] = value;
    }

    writeGm(address, value) {
        this.gm[address] = value;
    }

    writeLm(address, value) {
        this.lm[address] = value;
    }

    writeDc(address, value) {
        this.dc[address] = value;
    }

    getSc() {
        return this.sc;
    }

    getGm() {
        return this.gm;
    }

    getLm() {
        return this.lm;
    }

    getDc() {
        return this.dc;
    }
}

export default LocalMemory;
