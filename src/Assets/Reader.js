import * as signalr from "@microsoft/signalr";
import { APIURL } from "./Constants";

export const listen = (onUpdate, hubUrl, hubCode, actionCode) => {
  const connection = new signalr.HubConnectionBuilder()
    .withUrl(`${APIURL.local}${hubUrl}?hubCode=${hubCode}`, {
      skipNegotiation: true,
      transport: signalr.HttpTransportType.WebSockets,
    })
    .withAutomaticReconnect()
    .build();

  connection.on(actionCode, () => {
    onUpdate();
  });

  connection
    .start()
    .then(() => console.info("SignalR Connected"))
    .catch((err) => console.error("error: ", err));

  return connection;
};

export const stop = (connection) => {
  if (connection !== null) {
    connection.stop();
  }
};
