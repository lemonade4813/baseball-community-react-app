import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  isLogined: boolean;
  setIsLogined : React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogined, setIsLogined] = useState(false);


  return (
    <AuthContext.Provider value={{ isLogined, setIsLogined }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth는 AuthProvider 내부에서만 사용가능합니다.");
  }
  return context;
};