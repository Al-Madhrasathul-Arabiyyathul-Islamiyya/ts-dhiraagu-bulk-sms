import { DhiraaguDeliveryException } from "../exceptions/DhiraaguDeliveryException";
import { DhiraaguSmsException } from "../exceptions/DhiraaguSmsException";
import { Logger } from "../types";
import { renderXML, escapeXML } from "../utils/xmlRenderer";
import { DhiraaguSmsDelivery } from "./DhiraaguSmsDelivery";
import { DhiraaguSmsMessage } from "./DhiraaguSmsMessage";

export class DhiraaguSms {
  private username: string;
  private password: string;
  private url: string;
  private logger: Logger | null;

  static readonly DEFAULT_API_URL =
    "https://bulksms.dhiraagu.com.mv/partners/xmlMessage.jsp";

  constructor(
    username: string,
    password: string,
    url: string = DhiraaguSms.DEFAULT_API_URL,
    logger: Logger | null = console
  ) {
    this.username = username;
    this.password = password;
    this.url = url;
    this.logger = logger;
  }

  async send(
    mobiles: string | string[],
    message: string
  ): Promise<DhiraaguSmsMessage> {
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
    this.log("Sending SMS - Request XML:", xml);

    const response = await this.sendRequest(xml);
    this.log("Received SMS Response:", response);

    const messageData = new DhiraaguSmsMessage(message, mobiles, response);
    this.log("Parsed SMS Response Object:", messageData);

    if (messageData.responseStatus !== "100") {
      throw DhiraaguSmsException.messageFailed(
        messageData.responseStatus ?? "0",
        messageData.responseStatusDesc ?? "Unknown Error"
      );
    }

    return messageData;
  }

  async delivery(
    messageId: string,
    messageKey: string
  ): Promise<DhiraaguSmsDelivery> {
    const data = {
      message_id: escapeXML(messageId),
      message_key: escapeXML(messageKey),
    };

    const xml = renderXML("delivery", data);
    this.log("Checking Delivery Status - Request XML:", xml);

    const response = await this.sendRequest(xml);
    this.log("Received Delivery Status Response:", response);

    const deliveryData = new DhiraaguSmsDelivery(response);
    this.log("Parsed Delivery Response Object:", deliveryData);

    if (!deliveryData.messageStatusId) {
      throw DhiraaguDeliveryException.messageFailed(
        deliveryData.responseStatus ?? "0",
        deliveryData.responseStatusDesc ?? "Unknown Error"
      );
    }

    return deliveryData;
  }

  private async sendRequest(xml: string): Promise<any> {
    this.log("Sending HTTP POST Request to:", this.url);

    const response = await fetch(this.url, {
      method: "POST",
      headers: { "Content-Type": "application/xml" },
      body: xml,
    });

    this.log("HTTP Response Status:", response.status);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const responseText = await response.text();
    this.log("Raw Response Text:", responseText);

    const responseObject = await this.parseXml(responseText);
    this.log("Parsed Response Object:", responseObject);

    return responseObject;
  }

  private async parseXml(xml: string): Promise<any> {
    const { parseStringPromise } = await import("xml2js");
    const options = {
      explicitArray: false,
      ignoreAttrs: true,
      trim: true,
    };
    const result = await parseStringPromise(xml, options);
    return result;
  }

  private log(...args: any[]) {
    if (this.logger) {
      this.logger.log(...args);
    }
  }
}
