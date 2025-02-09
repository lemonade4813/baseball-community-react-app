import { FC, ReactNode } from "react";
import { useSelectGroupContext } from "./selectGroupContext";
import { styled } from "styled-components";


export interface OptionProps {
    children : ReactNode;
    value: string;
}
const OptionWrapper = styled.div<{ isSelected: boolean }>`
  padding: 10px 14px;
  cursor: pointer;
  background-color: ${({ isSelected }) => (isSelected ? "#007bff" : "white")};
  color: ${({ isSelected }) => (isSelected ? "white" : "#333")};

  &:hover {
    background-color: ${({ isSelected }) =>
      isSelected ? "#0056b3" : "#f0f0f0"};
  }
`;

export const Option: FC<OptionProps> = ({ value, children }) => {
  
    const { selectedValue, handleSelect } = useSelectGroupContext();
  
    const isSelected = selectedValue === value;
  
    return (
      <OptionWrapper
        isSelected={isSelected}
        onClick={() => handleSelect(value)}
      >
        {children}
      </OptionWrapper>
    );
  };