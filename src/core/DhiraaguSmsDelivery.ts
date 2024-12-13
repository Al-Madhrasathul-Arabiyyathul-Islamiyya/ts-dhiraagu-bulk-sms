import { DhiraaguSmsResponse } from "./DhiraaguSmsResponse";
import { DhiraaguSmsDevice } from "./DhiraaguSmsDevice";

export class DhiraaguSmsDelivery extends DhiraaguSmsResponse {
  messageId: string | null;
  messageStatusId: string | null;
  messageStatusDesc: string | null;
  devices: DhiraaguSmsDevice[];

  constructor(response: any = {}) {
    super(response);

    const content = response?.TELEMESSAGE?.TELEMESSAGE_CONTENT?.RESPONSE;
    console.log("Delivery Response Content:", content);

    this.messageId = content?.MESSAGE_ID ?? null;
    this.messageStatusId = content?.RESPONSE_STATUS ?? null;
    this.messageStatusDesc = content?.RESPONSE_STATUS_DESC ?? null;

    const recipients = content?.RECIPIENT_STATUS ?? [];
    this.devices = Array.isArray(recipients)
      ? recipients.map(
          (recipient: any) => new DhiraaguSmsDevice(recipient.DEVICE)
        )
      : [];
  }
}
