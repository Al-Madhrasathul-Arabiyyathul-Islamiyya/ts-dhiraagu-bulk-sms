"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DhiraaguSms = void 0;
const xml2js_1 = require("xml2js");
const DhiraaguDeliveryException_1 = require("../exceptions/DhiraaguDeliveryException");
const DhiraaguSmsException_1 = require("../exceptions/DhiraaguSmsException");
const xmlRenderer_1 = require("../utils/xmlRenderer");
const DhiraaguSmsDelivery_1 = require("./DhiraaguSmsDelivery");
const DhiraaguSmsMessage_1 = require("./DhiraaguSmsMessage");
class DhiraaguSms {
    constructor(username, password, url = DhiraaguSms.DEFAULT_API_URL, logger) {
        this.username = username;
        this.password = password;
        this.url = url;
        this.logger = logger;
    }
    async send(mobiles, message) {
        if (!Array.isArray(mobiles)) {
            mobiles = [mobiles];
        }
        const numbersXml = mobiles
            .map((number) => (0, xmlRenderer_1.renderXML)("_number", { number: (0, xmlRenderer_1.escapeXML)(number) }))
            .join("");
        const data = {
            username: (0, xmlRenderer_1.escapeXML)(this.username),
            password: (0, xmlRenderer_1.escapeXML)(this.password),
            numbers: numbersXml,
            message: (0, xmlRenderer_1.escapeXML)(message),
        };
        const xml = (0, xmlRenderer_1.renderXML)("send", data);
        this.log("Sending SMS - Request XML:", xml);
        const response = await this.sendRequest(xml);
        this.log("Received SMS Response:", response);
        const messageData = new DhiraaguSmsMessage_1.DhiraaguSmsMessage(message, mobiles, response);
        this.log("Parsed SMS Response Object:", messageData);
        if (messageData.responseStatus !== "100") {
            throw DhiraaguSmsException_1.DhiraaguSmsException.messageFailed(messageData.responseStatus ?? "0", messageData.responseStatusDesc ?? "Unknown Error");
        }
        return messageData;
    }
    async delivery(messageId, messageKey) {
        const data = {
            message_id: (0, xmlRenderer_1.escapeXML)(messageId),
            message_key: (0, xmlRenderer_1.escapeXML)(messageKey),
        };
        const xml = (0, xmlRenderer_1.renderXML)("delivery", data);
        this.log("Checking Delivery Status - Request XML:", xml);
        const response = await this.sendRequest(xml);
        this.log("Received Delivery Status Response:", response);
        const deliveryData = new DhiraaguSmsDelivery_1.DhiraaguSmsDelivery(response);
        this.log("Parsed Delivery Response Object:", deliveryData);
        if (!deliveryData.messageStatusId) {
            throw DhiraaguDeliveryException_1.DhiraaguDeliveryException.messageFailed(deliveryData.responseStatus ?? "0", deliveryData.responseStatusDesc ?? "Unknown Error");
        }
        return deliveryData;
    }
    async sendRequest(xml) {
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
    async parseXml(xml) {
        const options = {
            explicitArray: false,
            ignoreAttrs: true,
            trim: true,
        };
        const result = await (0, xml2js_1.parseStringPromise)(xml, options);
        return result;
    }
    log(...args) {
        if (this.logger?.log) {
            this.logger.log(...args);
        }
    }
}
exports.DhiraaguSms = DhiraaguSms;
DhiraaguSms.DEFAULT_API_URL = "https://bulksms.dhiraagu.com.mv/partners/xmlMessage.jsp";
//# sourceMappingURL=DhiraaguSms.js.map