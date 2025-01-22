import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const stompClient = new Client({
    brokerURL: "ws://localhost:8080/ws", // WebSocket 엔드포인트
    connectHeaders: {},
    debug: (str) => console.log(str),
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
});

export default stompClient;