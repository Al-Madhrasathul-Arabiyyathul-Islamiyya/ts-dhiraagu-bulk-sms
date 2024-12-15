"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DhiraaguSmsResponse = void 0;
class DhiraaguSmsResponse {
    constructor(response = {}) {
        this.responseStatus = response?.TELEMESSAGE_CONTENT?.RESPONSE?.RESPONSE_STATUS ?? null;
        this.responseStatusDesc = response?.TELEMESSAGE_CONTENT?.RESPONSE?.RESPONSE_STATUS_DESC ?? null;
    }
}
exports.DhiraaguSmsResponse = DhiraaguSmsResponse;
//# sourceMappingURL=DhiraaguSmsResponse.js.map