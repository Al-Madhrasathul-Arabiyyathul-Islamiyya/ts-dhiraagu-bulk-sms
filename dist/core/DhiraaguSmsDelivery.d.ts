import { DhiraaguSmsResponse } from "./DhiraaguSmsResponse";
import { DhiraaguSmsDevice } from "./DhiraaguSmsDevice";
export declare class DhiraaguSmsDelivery extends DhiraaguSmsResponse {
    messageId: string | null;
    messageStatusId: string | null;
    messageStatusDesc: string | null;
    devices: DhiraaguSmsDevice[];
    constructor(response?: any);
}
//# sourceMappingURL=DhiraaguSmsDelivery.d.ts.map