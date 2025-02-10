import { ChangeEvent, FC } from "react";
import { useInputGroupContext } from "./inputGroupContext";
import { styled } from "styled-components";

const InputField = styled.input`

    display: block;
    margin: 8px 0;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 8px;
`


interface InputProps {
    name: string;
    placeholder?: string;
}


export const Input: FC<InputProps> = ({ name, placeholder }) => {
 
    const { values, handleInputChange } = useInputGroupContext();
  
    return (
      <InputField
        type="text"
        id={name}
        name={name}
        placeholder={placeholder}
        value={values[name] || ""}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleInputChange(name, e.target.value)
        }
      />
    );
};
  