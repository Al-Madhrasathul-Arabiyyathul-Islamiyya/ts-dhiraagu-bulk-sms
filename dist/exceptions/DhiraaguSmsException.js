"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DhiraaguSmsException = void 0;
class DhiraaguSmsException extends Error {
    static messageFailed(errorCode = "0", errorDesc = "Unknown Error") {
        return new DhiraaguSmsException(`SMS was not sent. ${errorCode || "0"}: ${errorDesc || "Unknown Error"}`);
    }
}
exports.DhiraaguSmsException = DhiraaguSmsException;
//# sourceMappingURL=DhiraaguSmsException.js.map