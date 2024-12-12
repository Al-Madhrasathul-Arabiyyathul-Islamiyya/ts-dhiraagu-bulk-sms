export class DhiraaguSmsException extends Error {
  static messageFailed(errorCode: string = "0", errorDesc: string = "Unknown Error"): DhiraaguSmsException {
    return new DhiraaguSmsException(`SMS was not sent. ${errorCode}: ${errorDesc}`);
  }
}
