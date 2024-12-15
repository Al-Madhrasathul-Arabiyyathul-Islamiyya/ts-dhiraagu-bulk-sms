"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DhiraaguDeliveryException = void 0;
class DhiraaguDeliveryException extends Error {
    static messageFailed(errorCode = "0", errorDesc = "Unknown Error") {
        return new DhiraaguDeliveryException(`Delivery status could not be checked. ${errorCode || "0"}: ${errorDesc || "Unknown Error"}`);
    }
}
exports.DhiraaguDeliveryException = DhiraaguDeliveryException;
//# sourceMappingURL=DhiraaguDeliveryException.js.map