import { DhiraaguSmsResponse } from "./DhiraaguSmsResponse";

export class DhiraaguSmsMessage extends DhiraaguSmsResponse {
  messageId: string | null;
  messageKey: string | null;
  sentDate: string;
  numbers: string[];
  message: string;

  constructor(message: string, numbers: string[], response: any = {}) {
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
