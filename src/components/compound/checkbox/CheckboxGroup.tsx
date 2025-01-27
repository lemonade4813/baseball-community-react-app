import { ReactNode, FC } from "react";
import CheckboxContext from "./checkBoxGroupContext"
import Label from "./Label";
import { Checkbox } from "./Checkbox";

interface CheckboxGroupProps {
  children: ReactNode;
  value: string[];
  onChange: (value: string[]) => void;
}

type CheckboxGroupComponent = FC<CheckboxGroupProps> & {
  Label: typeof Label;
  Checkbox: typeof Checkbox;
};

export const CheckboxGroup: CheckboxGroupComponent = ({ children, value, onChange }) => {
  const toggleValue = (val: string) => {
    const newValue = value.includes(val)
      ? value.filter((v) => v !== val)
      : [...value, val];
    onChange(newValue);
  };

  return (
    <CheckboxContext.Provider value={{ selectedValues: value, toggleValue }}>
      <div>{children}</div>
    </CheckboxContext.Provider>
  );
};

CheckboxGroup.Label = Label;
CheckboxGroup.Checkbox = Checkbox;