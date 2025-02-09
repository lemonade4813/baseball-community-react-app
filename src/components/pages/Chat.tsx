import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getTeamImages } from "../../util/getTeamImage";
import { Container } from "../../styles/Styles";

const ButtonWrapper = styled.button`
  width: 80%;
  background-color: #bfdaF7;
  box-shadow: 1px 1px 1px 1px #555555;
  border-radius: 36px;
  height: 150px;
  border: none;
  font-size: 24px;
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 0 20px;
  cursor: pointer;

  img {
    width: 50px;
    height: 50px;
  }
`;

const ChatTypeWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const ChatTypeButton = ({ team }: { team: string }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/chat/${team}`);
  };

  return (
    <ButtonWrapper onClick={handleNavigate}>
      <img src={getTeamImages(team)?.src} alt={`${team} logo`} />
      <p>{getTeamImages(team)?.name} 채팅방 이동</p>
    </ButtonWrapper>
  );
};

export default function Chat() {

  return (
    <Container>
      <div style={{ marginBottom: "20px", fontSize: "20px", fontWeight: "bold" }}>
        채팅방
      </div>
      <ChatTypeWrapper>
        <ChatTypeButton team="tigers" />
        <ChatTypeButton team="lions" />
      </ChatTypeWrapper>
    </Container>
  );
}