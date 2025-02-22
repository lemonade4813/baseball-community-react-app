import { Client } from "@stomp/stompjs";

const stompClient = new Client({
    brokerURL : "ws://localhost:8080/ws",
    connectHeaders: {},
    debug: (str) => console.log("[STOMP DEBUG] " + str), 
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    reconnectDelay : 6000
});


export default stompClient;