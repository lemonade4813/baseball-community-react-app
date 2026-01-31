import styled from "styled-components";
import { useModalStore } from "@/store/useModalStore";
import { Button } from "@/styles/Styles";
import CloseSvg from "@/assets/close.svg";

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
  padding: 24px;
  border-radius: 8px;
  width : 180px;
  opacity : 0.8;
`;

export const GlobalModal = () => {
  const { isOpen, message, closeModal, buttonText, callback } = useModalStore();

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent onClick={(e) => e.stopPropagation()} className="global-modal-content">
        <img src={CloseSvg} 
          width={24} 
          height={24} 
          style={{alignSelf : 'flex-end'}}
          onClick={closeModal}
        />
        {message}
        <Button onClick={() => {
                                  closeModal();
                                  callback && callback();
                                }}
        >
          {buttonText || '닫기'}
        </Button>
      </ModalContent>
    </ModalOverlay>
  );
};