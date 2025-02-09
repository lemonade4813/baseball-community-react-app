import { createContext, useContext } from "react";

const CheckboxGroupContext = createContext<{
    selectedValues: string[];
    toggleValue: (value: string) => void;
  } | null>(null);

export const useCheckboxGroupContext = () => {
  const context = useContext(CheckboxGroupContext);

  if (!context) {
    throw new Error("CheckboxGroup 컴포넌트 내부에서만 사용 가능합니다.");
  }
  return context;
};

export default CheckboxGroupContext;