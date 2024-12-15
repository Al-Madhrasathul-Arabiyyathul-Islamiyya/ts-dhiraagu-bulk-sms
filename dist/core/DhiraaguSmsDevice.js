"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DhiraaguSmsDevice = void 0;
class DhiraaguSmsDevice {
    constructor(response = {}) {
        this.type = response?.TYPE ?? null;
        this.status = response?.STATUS ?? null;
        this.statusDesc = response?.DESCRIPTION ?? null;
        this.statusDate = response?.STATUS_DATE ?? null;
        this.number = response?.VALUE ? response.VALUE.replace(/[^0-9]/g, '') : null;
    }
}
exports.DhiraaguSmsDevice = DhiraaguSmsDevice;
//# sourceMappingURL=DhiraaguSmsDevice.js.map