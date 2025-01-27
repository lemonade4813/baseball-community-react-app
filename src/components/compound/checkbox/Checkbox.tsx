import { FC, ReactNode } from "react";
import { useCheckboxGroupContext } from "./checkBoxGroupContext";
import { styled } from "styled-components";

interface CheckboxProps {
    value: string;
    children : ReactNode;
}

const CheckboxComponent = styled.input.attrs({type : "checkbox"})`
`
  
export const Checkbox: FC<CheckboxProps> = ({ value }) => {

    const { selectedValues, toggleValue } = useCheckboxGroupContext();
  
    const isChecked = selectedValues.includes(value);
  
    return (
        <CheckboxComponent
          checked={isChecked}
          onChange={() => toggleValue(value)}
        />
    );
  };