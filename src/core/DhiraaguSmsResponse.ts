export abstract class DhiraaguSmsResponse {
  responseStatus: string | null;
  responseStatusDesc: string | null;

  constructor(response: any = {}) {
    this.responseStatus = response?.TELEMESSAGE_CONTENT?.RESPONSE?.RESPONSE_STATUS ?? null;
    this.responseStatusDesc = response?.TELEMESSAGE_CONTENT?.RESPONSE?.RESPONSE_STATUS_DESC ?? null;
  }
}
