export class DhiraaguSmsDevice {
  type: string | null;
  number: string | null;
  status: string | null;
  statusDesc: string | null;
  statusDate: string | null;

  constructor(response: any = {}) {
    this.type = response?.TYPE ?? null;
    this.status = response?.STATUS ?? null;
    this.statusDesc = response?.DESCRIPTION ?? null;
    this.statusDate = response?.STATUS_DATE ?? null;
    this.number = response?.VALUE ? response.VALUE.replace(/[^0-9]/g, '') : null;
  }
}
