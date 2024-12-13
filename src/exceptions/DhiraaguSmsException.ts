export class DhiraaguSmsException extends Error {
  static messageFailed(errorCode: string | null | undefined = "0", errorDesc: string | null | undefined = "Unknown Error"): DhiraaguSmsException {
    return new DhiraaguSmsException(`SMS was not sent. ${errorCode || "0"}: ${errorDesc || "Unknown Error"}`);
  }
}
