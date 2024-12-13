export class DhiraaguDeliveryException extends Error {
  static messageFailed(errorCode: string | null | undefined = "0", errorDesc: string | null | undefined = "Unknown Error"): DhiraaguDeliveryException {
    return new DhiraaguDeliveryException(`Delivery status could not be checked. ${errorCode || "0"}: ${errorDesc || "Unknown Error"}`);
  }
}
