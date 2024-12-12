import { DhiraaguSmsResponse } from "./DhiraaguSmsResponse";

export class DhiraaguSmsMessage extends DhiraaguSmsResponse {
  messageId: string | null;
  messageKey: string | null;
  sentDate: string;
  numbers: string[];
  message: string;

  constructor(message: string, numbers: string[], response: any = {}) {
    super(response);
    this.messageId = response?.TELEMESSAGE_CONTENT?.RESPONSE?.MESSAGE_ID ?? null;
    this.messageKey = response?.TELEMESSAGE_CONTENT?.RESPONSE?.MESSAGE_KEY ?? null;
    this.message = message;
    this.numbers = numbers;
    this.sentDate = new Date().toISOString();
  }
}
