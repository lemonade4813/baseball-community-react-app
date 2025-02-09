import React, { useState, useEffect } from "react";
import stompClient from "../../socket";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getTeamImages } from "../../util/getTeamImage";
import { styled } from "styled-components";


const TitleWrapper = styled.div`
    display : flex;
    align-items : center;
    gap : 20px;
`
const ChatInputWrapper = styled.div`
    display : flex;
    height : 40px;
    margin-Top : 20px;
`

const ChatInput = styled.input` 

    width : 80%;
    border-Radius : 10px;
    border: 1px solid #D3D3D3;
    padding-left : 8px;
`

const ChatSubmitButton = styled.button`

    width : 20%;
    border-radius : 16px;
    border : 1px solid #D3D3D3;
    cursor : pointer;

`

const ChatMessageWrapper = styled.div`
    height: 300px;
    overflow-y: auto;
    border-radius : 20px;
    border: 1px solid #ccc;
    padding: 10px;

`

const ChatRoom: React.FC = () => {
    const { team } = useParams();
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState<string>("");

    useEffect(() => {
        // 이전 메시지 불러오기
        const fetchMessages = async () => {
            const response = await axios.get(`http://localhost:8080/chat/${team}/messages`);

            const fetchedMessages = response?.data?.map(
                (msg: any) => `${msg.sender}: ${msg.content}`
            );
            setMessages(fetchedMessages);
        };

        fetchMessages();

        // WebSocket 연결 및 구독
        stompClient.onConnect = () => {
            const subscription = stompClient.subscribe(`/baseballchat/room/${team}`, (message) => {
                const receivedMessage = JSON.parse(message.body);
                setMessages((prev) => [...prev, `${receivedMessage.sender}: ${receivedMessage.content}`]);
            });

            // 컴포넌트 언마운트 시 구독 해제
            return () => {
                subscription.unsubscribe();
            };
        };

        // WebSocket 연결 시작
        if (!stompClient.connected) {
            stompClient.activate();
        }

        return () => {
            if (stompClient.connected) {
                stompClient.deactivate();
            }
        };
    }, [team]);

    const sendMessage = () => {
        if (input.trim()) {
            stompClient.publish({
                destination: `/app/chat/${team}`,
                body: JSON.stringify({ sender: "User", content: input }),
            });
            setInput("");
        }
    };

    return (
        <div>
            <TitleWrapper>
                <img width={60} height={60} src={getTeamImages(team!)?.src}/>
                <h2 style={{fontSize : '20px'}}>{getTeamImages(team!)?.name} 채팅방</h2>
            </TitleWrapper>
            <ChatMessageWrapper>
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </ChatMessageWrapper>
            <ChatInputWrapper>
                <ChatInput
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="메시지를 입력하세요"
                />
                <ChatSubmitButton onClick={sendMessage}>전송</ChatSubmitButton>
            </ChatInputWrapper>
        </div>
    );
};

export default ChatRoom;