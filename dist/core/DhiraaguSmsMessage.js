"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DhiraaguSmsMessage = void 0;
const DhiraaguSmsResponse_1 = require("./DhiraaguSmsResponse");
class DhiraaguSmsMessage extends DhiraaguSmsResponse_1.DhiraaguSmsResponse {
    constructor(message, numbers, response = {}) {
        super(response);
        const content = response?.TELEMESSAGE?.TELEMESSAGE_CONTENT?.RESPONSE;
        this.messageId = content?.MESSAGE_ID ?? null;
        this.messageKey = content?.MESSAGE_KEY ?? null;
        this.message = message;
        this.numbers = numbers;
        this.sentDate = new Date().toISOString();
        this.responseStatus = content?.RESPONSE_STATUS ?? null;
        this.responseStatusDesc = content?.RESPONSE_STATUS_DESC ?? null;
    }
}
exports.DhiraaguSmsMessage = DhiraaguSmsMessage;
//# sourceMappingURL=DhiraaguSmsMessage.js.map