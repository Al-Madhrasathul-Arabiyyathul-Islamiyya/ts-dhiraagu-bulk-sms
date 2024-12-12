import { DhiraaguSmsResponse } from "./DhiraaguSmsResponse";
import { DhiraaguSmsDevice } from "./DhiraaguSmsDevice";

export class DhiraaguSmsDelivery extends DhiraaguSmsResponse {
  messageId: string | null;
  messageStatusId: string | null;
  messageStatusDesc: string | null;
  devices: DhiraaguSmsDevice[];

  constructor(response: any = {}) {
    super(response);
    this.messageId = response?.TELEMESSAGE_CONTENT?.MESSAGE_STATUS?.MESSAGE_ID ?? null;
    this.messageStatusId = response?.TELEMESSAGE_CONTENT?.MESSAGE_STATUS?.STATUS_ID ?? null;
    this.messageStatusDesc = response?.TELEMESSAGE_CONTENT?.MESSAGE_STATUS?.STATUS_DESCRIPTION ?? null;

    const recipients = response?.TELEMESSAGE_CONTENT?.MESSAGE_STATUS?.RECIPIENT_STATUS ?? [];
    this.devices = recipients.map((recipient: any) => new DhiraaguSmsDevice(recipient.DEVICE));
  }

  getDevice(number: string): DhiraaguSmsDevice | null {
    return this.devices.find((device) => device.number === number) || null;
  }
}
