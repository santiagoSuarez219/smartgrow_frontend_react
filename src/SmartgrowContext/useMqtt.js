import { useState, useEffect } from "react";
import mqtt from "mqtt";

const useMqtt = (initialTopic) => {
  const [client, setClient] = useState(null);
  const [message, setMessage] = useState(null);
  const [connectStatus, setConnectStatus] = useState(false);
  const [subscribedTopics, setSubscribedTopics] = useState([]);

  const mqttBrokerUrl = "ws://200.122.207.134:8314/mqtt";
  //200.122.207.134

  const mqttConnect = () => {
    setConnectStatus("Connecting");
    const newClient = mqtt.connect(mqttBrokerUrl);

    newClient.on("connect", () => {
      setConnectStatus(true);
      newClient.subscribe(initialTopic);
      console.log("Connection successful");
    });

    newClient.on("error", (err) => {
      console.error("Connection error: ", err);
      newClient.end();
      setConnectStatus(false);
    });

    newClient.on("reconnect", () => {
      setConnectStatus(false);
    });

    newClient.on("message", (topic, message) => {
      const data = { topic, message: message.toString() };
      setMessage(data);
      console.log(`Received message: ${message} from topic: ${topic}`);
    });

    setClient(newClient);
  };

  const mqttSubscribe = (newTopic) => {
    if (client) {
      client.subscribe(newTopic);
      setSubscribedTopics([...subscribedTopics, newTopic]);
    }
  };

  const mqttDisconnect = () => {
    if (client) {
      try {
        client.end(false, () => {
          setConnectStatus(false);
          console.log("Disconnected successfully");
        });
      } catch (error) {
        console.log("Disconnect error:", error);
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

  useEffect(() => {
    return () => {
      if (client) {
        client.end();
      }
    };
  }, [client]);

  return {
    message,
    connectStatus,
    subscribedTopics,
    mqttConnect,
    mqttSubscribe,
    mqttDisconnect,
    mqttPublish,
  };
};

export { useMqtt };
