# Dhiraagu SMS (TypeScript)

[![License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](LICENSE)

TypeScript SDK for [Dhiraagu Bulk SMS Gateway](https://bulkmessage.dhiraagu.com.mv), inspired by the [PHP SDK](https://github.com/dash8x/dhiraagu-sms) developed by [Arushad Ahmed (@dash8x)](http://arushad.org).

## Installation

Install the library using npm or yarn:

```bash
npm install dhiraagu-sms
# or
yarn add dhiraagu-sms
```

## Quickstart

Sending an SMS

```ts
// Import the library
import { DhiraaguSms } from "dhiraagu-sms";

const username = "XXXXXXX"; // Your SMS username from Dhiraagu
const password = "YYYYYY"; // Your SMS password
const url = "https://bulksms.dhiraagu.com.mv/partners/xmlMessage.jsp"; // Optional, leave blank to use the default API endpoint

const client = new DhiraaguSms(username, password, url);

(async () => {
  try {
    const message = await client.send(
      "+9607777777", // Recipient's number; use an array for multiple recipients
      "Hello World!" // Your message
    );

    console.log("Message ID:", message.messageId);
  } catch (error) {
    console.error("Error sending SMS:", error);
  }
})();
```

## Checking SMS Delivery Status

```ts
import { DhiraaguSms } from "dhiraagu-sms";

const username = "XXXXXXX"; // Your SMS username
const password = "YYYYYY"; // Your SMS password

const client = new DhiraaguSms(username, password);

(async () => {
  try {
    const message = await client.send(
      "+9607777777", // Recipient's number
      "Hello World!" // Your message
    );

    const delivery = await client.delivery(
      message.messageId, // Message ID
      message.messageKey // Message key
    );

    console.log("Delivery Status:", delivery.messageStatusDesc);

    // Check the status for a particular recipient
    const device = delivery.getDevice("9607777777"); // Omit the "+" in the country code
    console.log("Recipient Status:", device?.statusDesc);
  } catch (error) {
    console.error("Error checking delivery status:", error);
  }
})();
```

## Features

- Send SMS messages to one or multiple recipients.
- Check delivery statuses for sent messages.
- Retrieve detailed recipient statuses.

## XML Templates

The library uses XML templates similar to the PHP version. These templates are located in the src/xml folder.

## Credits

This library was adapted from the PHP SDK by Arushad Ahmed (@dash8x). Special thanks for the original implementation and inspiration.

## Disclaimer

This package is not officially affiliated with Dhiraagu. The "Dhiraagu" name is used under fair use.

## License

This SDK is open-source software licensed under the MIT license.
