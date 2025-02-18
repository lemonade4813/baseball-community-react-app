import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Container, Title } from "../../styles/Styles";
import { useUserInfo } from "../../store/useUserInfoStore";
import BaseBallSvg from "@assets/baseball.svg";
import { teamImgListAll } from "../../util/teamList";
import ChatSvg from "../../assets/chat.svg";

const ButtonWrapper = styled.button`
  background: linear-gradient(135deg, #6eb3f7, #4a90e2);
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
  border-radius: 50px;
  width : 320px;
  height: 80px;
  border: none;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 0 25px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  color: #ffffff;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
  }

  img {
    width: 60px;
    height: 60px;
  }
`;

const ChatTypeWrapper = styled.div`
  display: flex;
  flex-direction : column;
  gap: 40px;
  justify-content: center;
  margin-top: 40px;
`;

const ChatTypeButton = ({ team }: { team?: string }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/chat/${team || "common"}`);
  };

  const myTeamObj = teamImgListAll.find((t) => t.team === team);

  return (
    <ButtonWrapper onClick={handleNavigate}>
      <img src={myTeamObj?.src || BaseBallSvg} alt={`${team || "전체"} logo`} />
      <p>{myTeamObj?.name || "전체"} 채팅방</p>
    </ButtonWrapper>
  );
};

export default function Chat() {
  const myTeam = useUserInfo((state) => state.team);

  return (
    <Container>
        <Title>
          <img src={ChatSvg} width={40} height={40}/>
          <span>채팅방</span>
        </Title>
        <ChatTypeWrapper>
          <ChatTypeButton />
          {myTeam && <ChatTypeButton team={myTeam} />}
        </ChatTypeWrapper>
    </Container>
  );
}
