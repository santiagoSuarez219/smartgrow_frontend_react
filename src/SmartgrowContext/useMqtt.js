import { useState, useEffect } from "react";
import mqtt from "mqtt";

const useMqtt = (topic) => {
  const [client, setClient] = useState(null);
  const [message, setMessage] = useState(null);
  const [connectStatus, setConnectStatus] = useState(false);

  const mqttBrokerUrl = "ws://200.122.207.134:8314/mqtt"; //8314
  //200.122.207.134

  const mqttConnect = () => {
    setConnectStatus("Connecting");
    setClient(mqtt.connect(mqttBrokerUrl));
  };

  useEffect(() => {
    if (client) {
      client.on("connect", () => {
        setConnectStatus(true);
        client.subscribe(topic);
        client.subscribe("smartgrow/actuadores");
        console.log("connection successful");
      });

      client.on("error", (err) => {
        console.error("Connection error: ", err);
        client.end();
        setConnectStatus(false);
      });

      client.on("reconnect", () => {
        setConnectStatus(false);
      });

      client.on("message", (topic, message) => {
        const data = { topic, message: message.toString() };
        setMessage(data);
        console.log(`received message: ${message} from topic: ${topic}`);
      });
    }
  }, [client]);

  const mqttDisconnect = () => {
    if (client) {
      try {
        client.end(false, () => {
          setConnectStatus(false);
          console.log("disconnected successfully");
        });
      } catch (error) {
        console.log("disconnect error:", error);
      }
    }
  };

  const mqttPublish = (context) => {
    if (client) {
      const { topic, qos, payload } = context;
      client.publish(topic, payload, qos, (error) => {
        if (error) {
          console.log("Publish error: ", error);
        } else {
          console.log("Published successfully");
        }
      });
    }
  };

  return { message, connectStatus, mqttConnect, mqttPublish };
};

export { useMqtt };
