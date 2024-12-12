export class DhiraaguDeliveryException extends Error {
  static messageFailed(errorCode: string = "0", errorDesc: string = "Unknown Error"): DhiraaguDeliveryException {
    return new DhiraaguDeliveryException(`Delivery status could not be checked. ${errorCode}: ${errorDesc}`);
  }
}
