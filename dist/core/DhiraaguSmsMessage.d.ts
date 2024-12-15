import { DhiraaguSmsResponse } from "./DhiraaguSmsResponse";
export declare class DhiraaguSmsMessage extends DhiraaguSmsResponse {
    messageId: string | null;
    messageKey: string | null;
    sentDate: string;
    numbers: string[];
    message: string;
    constructor(message: string, numbers: string[], response?: any);
}
//# sourceMappingURL=DhiraaguSmsMessage.d.ts.map