import { createContext, useContext } from "react";

export const InputGroupContext = createContext<{
    values: Record<string, string>;
    handleInputChange: (name: string, value: string) => void;
  } | null>(null);

  export const useInputGroupContext = () => {

    const context = useContext(InputGroupContext);

    if (!context) {
    throw new Error("InputGroup 내부에서만 사용가능 합니다.");
    }

    return context;

  }
export default InputGroupContext;