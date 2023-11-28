import * as mqtt from "mqtt";
import fs from "fs";

const broker = "mqtt://ec2-3-217-208-30.compute-1.amazonaws.com:8883";
const options = {
  protocol: "mqtts",
  ca: [fs.readFileSync("./ca-root-cert-aws.crt")],
};

const client = mqtt.connect(broker, options);

client.on("connect", () => {
  console.log("Connected to MQTT broker");

  client.subscribe("#", (err) => {
    if (err) {
      console.error("Error subscribing:", err);
    }
  });

  setInterval(() => {
    console.log("Publishing message to topic ESP32/Saludo");
    client.publish("ESP32/Saludo", "Hola Mundo");
  }, 15000); // 15 seconds interval
});

client.on("message", (topic, message) => {
    console.log("Received message:", topic, message.toString());
});

client.on("error", (err) => {
  console.error("Error:", err);
});

client.on("close", () => {
  console.log("Connection closed");
});
