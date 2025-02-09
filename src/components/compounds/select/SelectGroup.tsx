import { ReactNode, FC, useState } from "react";
import SelectGroupContext from "./selectGroupContext";
import { styled } from "styled-components";

const SelectGroupContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 250px;
`;

const Trigger = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px 14px;
  background-color: white;
  color: #333;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    border-color: #888;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;


const Placeholder = styled.span`
  color: #aaa;
`;

const Arrow = styled.span`
  font-size: 0.8rem;
  color: #888;
`;


interface SelectGroupProps {
    children: ReactNode;
    value: string | null;
    onChange: (value: string) => void;
    placeholder? : string;
}


export const SelectGroup: FC<SelectGroupProps> = ({ children, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  const toggleDropdown = () => setIsOpen((prev) => !prev);


  return (
    <SelectGroupContainer>
      <Trigger onClick={toggleDropdown}>
        {value ? value : <Placeholder>{placeholder}</Placeholder>}
        <Arrow>{isOpen ? "▲" : "▼"}</Arrow>
      </Trigger>
      {isOpen && (
        <Dropdown>
          <SelectGroupContext.Provider value={{ selectedValue: value, handleSelect }}>
            {children}
          </SelectGroupContext.Provider>
        </Dropdown>
      )}
    </SelectGroupContainer>
  );
};

