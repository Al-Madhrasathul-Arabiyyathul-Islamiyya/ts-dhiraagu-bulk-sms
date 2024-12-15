import { type Logger } from "../types";
import { DhiraaguSmsDelivery } from "./DhiraaguSmsDelivery";
import { DhiraaguSmsMessage } from "./DhiraaguSmsMessage";
export declare class DhiraaguSms {
    private username;
    private password;
    private url;
    private logger?;
    static readonly DEFAULT_API_URL = "https://bulksms.dhiraagu.com.mv/partners/xmlMessage.jsp";
    constructor(username: string, password: string, url?: string, logger?: Logger);
    send(mobiles: string | string[], message: string): Promise<DhiraaguSmsMessage>;
    delivery(messageId: string, messageKey: string): Promise<DhiraaguSmsDelivery>;
    private sendRequest;
    private parseXml;
    private log;
}
//# sourceMappingURL=DhiraaguSms.d.ts.map