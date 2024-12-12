import { escapeXML, renderXML } from "../utils/xmlRenderer";
import { DhiraaguSmsMessage } from "./DhiraaguSmsMessage";
import { DhiraaguSmsDelivery } from "./DhiraaguSmsDelivery";
import { DhiraaguSmsException } from "../exceptions/DhiraaguSmsException";
import { DhiraaguDeliveryException } from "../exceptions/DhiraaguDeliveryException";

export class DhiraaguSms {
  private username: string;
  private password: string;
  private url: string;
  static readonly DEFAULT_API_URL = "https://bulksms.dhiraagu.com.mv/partners/xmlMessage.jsp";

  constructor(username: string, password: string, url: string = DhiraaguSms.DEFAULT_API_URL) {
    this.username = username;
    this.password = password;
    this.url = url;
  }

  async send(mobiles: string | string[], message: string): Promise<DhiraaguSmsMessage> {
    if (!Array.isArray(mobiles)) {
      mobiles = [mobiles];
    }

    const numbersXml = mobiles
      .map((number) => renderXML("_number", { number: escapeXML(number) }))
      .join("");

    const data = {
      username: escapeXML(this.username),
      password: escapeXML(this.password),
      numbers: numbersXml,
      message: escapeXML(message),
    };

    const xml = renderXML("send", data);
    const response = await this.sendRequest(xml);

    const messageData = new DhiraaguSmsMessage(message, mobiles, response);
    if (messageData.responseStatus !== "100") {
      throw DhiraaguSmsException.messageFailed(messageData.responseStatus, messageData.responseStatusDesc);
    }

    return messageData;
  }

  async delivery(messageId: string, messageKey: string): Promise<DhiraaguSmsDelivery> {
    const data = {
      message_id: escapeXML(messageId),
      message_key: escapeXML(messageKey),
    };

    const xml = renderXML("delivery", data);
    const response = await this.sendRequest(xml);

    const deliveryData = new DhiraaguSmsDelivery(response);
    if (!deliveryData.messageStatusId) {
      throw DhiraaguDeliveryException.messageFailed(deliveryData.responseStatus, deliveryData.responseStatusDesc);
    }

    return deliveryData;
  }

  private async sendRequest(xml: string): Promise<any> {
    const response = await fetch(this.url, {
      method: "POST",
      headers: { "Content-Type": "application/xml" },
      body: xml,
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const responseText = await response.text();
    const responseObject = await this.parseXml(responseText);

    return responseObject;
  }

  private async parseXml(xml: string): Promise<any> {
    const { parseStringPromise } = await import("xml2js");
    return parseStringPromise(xml);
  }
}
