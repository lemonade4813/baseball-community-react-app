import React, { useState, useEffect, useRef } from "react";
import stompClient from "../../socket";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axiosInstance from "@/util/axiosIntance";
import BaseBallSvg from "@/assets/baseball.svg";
import { teamImgListAll } from "@/util/teamList";
import { Title, Container, Input, InputWrapper, Button, Flex } from "@/styles/Styles";
import { useUserInfo } from "@/store/useUserInfoStore";
import UserSvg from "@/assets/user.svg";

const ChatMessagesWrapper = styled.div`
    height: 300px;
    overflow-y: auto;
    border-radius: 20px;
    border: 1px solid #ccc;
    padding: 10px;
    width : 100%;
    display : flex;
    flex-direction : column;
    background-color : #9BBBD4;
`;

interface IChatMeassage {
    id : string;
    sender : string;
    content : string;
    profileImageUrl : string;
}

const ChatMessage = styled.div<{ isMyMessage: boolean }>`
    display: flex;
    flex-direction: column;
    align-self: ${({ isMyMessage }) => (isMyMessage ? 'flex-end' : 'flex-start')};
    color : ${({ isMyMessage }) => (isMyMessage ? 'red' : '#000')};
    gap : 2px;
    margin-top : 16px;
    
`;

const ChatUser = styled.p`
    font-size : 16px;
`

const ChatText = styled.p<{ isMyMessage: boolean }>`
    background-color : ${({ isMyMessage }) => (isMyMessage ? '#FFD9EA' : "#FCF5CF")};
    height : 48px;
    border-radius : 12px;
    width : 300px;
    line-height : 48px;
    padding-left : 8px;
    box-shadow : 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`

function generateUserId() {
    const prefix = "user-";
    const randomStr = Math.random().toString(36).slice(2, 10);
    const timestamp = Date.now();
  
    return `${prefix}${randomStr}-${timestamp}`;
  }


const ChatRoom: React.FC = () => {
    const { team } = useParams();
    const [messages, setMessages] = useState<IChatMeassage[]>([]);
    const [input, setInput] = useState<string>("");

    const nickname = useRef((useUserInfo.getState().nickname)|| generateUserId())?.current;

    useEffect(() => {
        const fetchMessages = async () => {
            const res = await axiosInstance.get(`/chat/${team || "common"}/messages`);
            setMessages(res.data);
        };

        fetchMessages();
       
        stompClient.onConnect = () => {
            const chatRoom = team ? `/baseballchat/room/${team}` : "/baseballchat/room/common";
            const subscription = stompClient.subscribe(chatRoom, (message) => {
                const receivedMessage = JSON.parse(message.body);
                setMessages((prev) => [...prev, receivedMessage]);
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
            const destination = `/app/chat/${team}`;
            stompClient.publish({
                destination,
                body: JSON.stringify({ sender: nickname, content: input, team }),
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
            <ChatMessagesWrapper>
                {messages?.map((msg) => (
                    <ChatMessage key={msg.id} isMyMessage={nickname === msg.sender}>
                        <Flex style={{justifyContent : 'space-between'}}>
                            <ChatUser>{msg.sender}</ChatUser>
                            <img src={ msg.profileImageUrl ?
                                     `${import.meta.env.VITE_API_BASE_URL}${msg.profileImageUrl}`
                                      : UserSvg
                                    } 
                                width={20} 
                                height={20}
                            />
                        </Flex>
                        <ChatText isMyMessage={nickname === msg.sender}>{msg.content}</ChatText>
                    </ChatMessage>
                ))}
            </ChatMessagesWrapper>
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
