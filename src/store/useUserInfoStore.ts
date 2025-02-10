import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// 상태 인터페이스 정의
export interface IUserInfoState {
  nickname: string | null;
  profileImagePath: string | null;
  isLogined: boolean;
  team : null;
  setUserInfo : (userInfo: Partial<IUserInfoState>) => void;
  reset: () => void;
}

// Zustand 상태 관리
export const useUserInfo = create<IUserInfoState>()(
  persist(
    (set) => ({
      nickname: null,
      profileImagePath: null,
      isLogined: false,
      team : null,
      setUserInfo: (auth) => set((state) => ({ ...state, ...auth })),
      reset : () =>
        set({
          nickname: null,
          profileImagePath: null,
          isLogined: false,
          team : null
        }),
    }),
    { name: "userInfo", storage: createJSONStorage(() => sessionStorage) }
  )
);

// interface AuthState {
//   accessToken: string | null;
//   setToken: (token: string | null) => void;
//   clearToken: () => void;
// }

// export const useAuthStore = create<AuthState>()(persist(
//     (set) => ({
//         accessToken: null,
//         setToken: (accessToken) => set({ accessToken }),
//         clearToken: () => set({ accessToken: null }),
//     }), 
// { name: "accessToken", storage: createJSONStorage(() => sessionStorage) }));