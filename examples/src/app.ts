import readline from "readline";
import { sendSms, checkDelivery } from "./api";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const prompt = (query: string): Promise<string> =>
  new Promise((resolve) => rl.question(query, resolve));

const main = async () => {
  console.log("Dhiraagu SMS Console App");
  console.log("========================");

  try {
    const action = await prompt("Choose an action: [1] Send SMS, [2] Check Delivery: ");

    if (action === "1") {
      const number = await prompt("Enter recipient number (e.g., +9607777777): ");
      const message = await prompt("Enter message: ");
      console.log("Sending SMS...");
      const response = await sendSms(number, message);
      console.log(`Message sent! ID: ${response.messageId}, Key: ${response.messageKey}`);
    } else if (action === "2") {
      const messageId = await prompt("Enter Message ID: ");
      const messageKey = await prompt("Enter Message Key: ");
      console.log("Checking delivery...");
      const response = await checkDelivery(messageId, messageKey);
      console.log(`Delivery Status: ${response.messageStatusDesc}`);
    } else {
      console.log("Invalid action. Exiting.");
    }
  } catch (error: any) {
    console.error(error.message);
  } finally {
    rl.close();
  }
};

main();
