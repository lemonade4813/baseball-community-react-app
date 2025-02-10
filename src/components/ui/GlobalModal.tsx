import styled from "styled-components";
import { useModalStore } from "../../store/useModalStore";
import { Button } from "../../styles/Styles";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index : 9999;
`;

const ModalContent = styled.div`
  display : flex;
  align-items : center;
  gap : 20px;
  flex-direction : column;
  background: white;
  padding: 40px;
  border-radius: 8px;
  width : 180px;
`;

export const GlobalModal = () => {
  const { isOpen, message, closeModal } = useModalStore();

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={closeModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {message}
        <Button onClick={closeModal}>닫기</Button>
      </ModalContent>
    </ModalOverlay>
  );
};