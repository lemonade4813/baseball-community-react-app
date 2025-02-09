
import { ReactNode, FC } from "react";
import InputGroupContext from "./inputGroupContext";
import Label from "./Label";
import { Input } from "./Input";
import { styled } from "styled-components";

const InputGroupContainer = styled.div`

    display : flex;
    justify-content : center;
    align-items : center;

`


interface InputGroupProps {
  children: ReactNode;
  values: Record<string, string>;
  onChange: (name: string, value: string) => void;
}

type InputGroupComponent = FC<InputGroupProps> & {
  Label: typeof Label;
  Input: typeof Input;
};

export const InputGroup: InputGroupComponent = ({ children, values, onChange }) => {
  const handleInputChange = (name: string, value: string) => {
    onChange(name, value);
  };

  return (
    <InputGroupContext.Provider value={{ values, handleInputChange }}>
      <InputGroupContainer>{children}</InputGroupContainer>
    </InputGroupContext.Provider>
  );
};

// 정적 프로퍼티 추가
InputGroup.Label = Label;
InputGroup.Input = Input;