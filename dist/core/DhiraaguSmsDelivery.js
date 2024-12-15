"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DhiraaguSmsDelivery = void 0;
const DhiraaguSmsResponse_1 = require("./DhiraaguSmsResponse");
const DhiraaguSmsDevice_1 = require("./DhiraaguSmsDevice");
class DhiraaguSmsDelivery extends DhiraaguSmsResponse_1.DhiraaguSmsResponse {
    constructor(response = {}) {
        super(response);
        const content = response?.TELEMESSAGE?.TELEMESSAGE_CONTENT?.RESPONSE;
        console.log("Delivery Response Content:", content);
        this.messageId = content?.MESSAGE_ID ?? null;
        this.messageStatusId = content?.RESPONSE_STATUS ?? null;
        this.messageStatusDesc = content?.RESPONSE_STATUS_DESC ?? null;
        const recipients = content?.RECIPIENT_STATUS ?? [];
        this.devices = Array.isArray(recipients)
            ? recipients.map((recipient) => new DhiraaguSmsDevice_1.DhiraaguSmsDevice(recipient.DEVICE))
            : [];
    }
}
exports.DhiraaguSmsDelivery = DhiraaguSmsDelivery;
//# sourceMappingURL=DhiraaguSmsDelivery.js.map