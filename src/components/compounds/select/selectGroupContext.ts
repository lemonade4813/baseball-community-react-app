import { createContext, useContext } from "react";

const SelectGroupContext = createContext<{
    selectedValue: string | null;
    handleSelect: (value: string) => void;
} | null>(null);

export const useSelectGroupContext = () => {

    const context = useContext(SelectGroupContext);

    if (!context) {
        throw new Error("SelectGroup 컴포넌트 내부에서만 사용가능합니다.");
    }

    return context;
}

export default SelectGroupContext;
