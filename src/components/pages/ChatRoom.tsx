import React, { useState, useEffect } from "react";
import stompClient from "../../socket";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axiosInstance from "../../util/axiosIntance";
import BaseBallSvg from "../../assets/baseball.svg";
import { teamImgListAll } from "../../util/teamList";
import { Title, Container, Input, InputWrapper, Button } from "../../styles/Styles";


// const ChatInputWrapper = styled.div`
//     display: flex;
//     height: 40px;
//     margin-top: 20px;
// `;

// const ChatInput = styled.input`
//     width: 80%;
//     border-radius: 10px;
//     border: 1px solid #D3D3D3;
//     padding-left: 8px;
// `;

// const ChatSubmitButton = styled.button`
//     width: 20%;
//     border-radius: 16px;
//     border: 1px solid #D3D3D3;
//     cursor: pointer;
// `;

const ChatMessageWrapper = styled.div`
    height: 300px;
    overflow-y: auto;
    border-radius: 20px;
    border: 1px solid #ccc;
    padding: 10px;
    width : 100%;
`;

const ChatRoom: React.FC = () => {
    const { team } = useParams();
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState<string>("");

    useEffect(() => {
        const fetchMessages = async () => {
            const response = await axiosInstance.get(`/chat/${team || "common"}/messages`);
            const fetchedMessages = response?.data?.map((msg: any) => `${msg.sender}: ${msg.content}`);
            setMessages(fetchedMessages);
        };

        fetchMessages();

        stompClient.onConnect = () => {
            const chatRoom = team ? `/baseballchat/room/${team}` : "/baseballchat/room/common";
            const subscription = stompClient.subscribe(chatRoom, (message) => {
                const receivedMessage = JSON.parse(message.body);
                setMessages((prev) => [...prev, `${receivedMessage.sender}: ${receivedMessage.content}`]);
            });

            return () => {
                subscription.unsubscribe();
            };
        };

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
            const destination = team ? `/app/chat/${team}` : "/app/chat/common";
            stompClient.publish({
                destination,
                body: JSON.stringify({ sender: "User", content: input }),
            });
            setInput("");
        }
    };

    const myTeamObj = teamImgListAll.find((t) => t.team === team);

    return (
        <Container>
            <Title>
                <img 
                    width={60} 
                    height={60} 
                    src={myTeamObj?.src || BaseBallSvg} 
                    alt={`${myTeamObj?.name} logo`} 
                />
                <span>{myTeamObj?.name || '전체'} 채팅방</span>
            </Title>
            <ChatMessageWrapper>
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </ChatMessageWrapper>
            <InputWrapper style={{marginTop : '40px'}}>
                <Input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="메시지를 입력하세요"
                />
                <Button onClick={sendMessage}>전송</Button>
            </InputWrapper>
        </Container>
    );
};

export default ChatRoom;
