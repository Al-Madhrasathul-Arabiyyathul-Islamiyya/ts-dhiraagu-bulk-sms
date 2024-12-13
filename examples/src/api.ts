import { DhiraaguSms } from "../../src/core/DhiraaguSms";
import { env } from "./env";

const client = new DhiraaguSms(env.username, env.password, env.url);

export const sendSms = async (number: string, message: string) => {
  try {
    const response = await client.send(number, message);
    return response;
  } catch (error) {
    throw new Error(`Failed to send SMS: ${error}`);
  }
};

export const checkDelivery = async (messageId: string, messageKey: string) => {
  try {
    const response = await client.delivery(messageId, messageKey);
    return response;
  } catch (error) {
    throw new Error(`Failed to check delivery: ${error}`);
  }
};
