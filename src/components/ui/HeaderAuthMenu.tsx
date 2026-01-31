import { Link, useNavigate } from "react-router-dom";
import { useUserInfo } from "@/store/useUserInfoStore";
import { useShallow } from "zustand/shallow";
import axiosInstance from "@/util/axiosIntance";
import { Flex } from "@/styles/Styles";
import LogoutSvg from "@/assets/logout.svg";
import styled from "styled-components";

const HeaderAuthMenuWrapper = styled.div`
    display : flex;
    gap : 16px;
    justify-content : center;
    align-items : center;

    @media screen and (max-width : 575px){
        display : none;
    }
`

const HeaderAuthMenu = () => {
    
    const navigate = useNavigate();


    const {reset : 
        resetUserInfo ,
        isLogined, 
        nickname, 
        profileImagePath
    } = useUserInfo(useShallow((state) => ({
    reset: state.reset,
    isLogined: state.isLogined,
    nickname : state.nickname,
    profileImagePath : state.profileImagePath
})));

    const requestLogout = async () => {
        try {
                const {data, status} = await axiosInstance.get("/users/logout");
                if(status === 200){
                    console.log(data);
                }
        } catch (e) {
        if (e instanceof Error) {
            console.log(e.message);
        }
        }
    }

    const handleLogout = () => {
        requestLogout();
        resetUserInfo();
        sessionStorage.clear();
        navigate('/schedule');
    }


    const loginLink = <Link to="/login">로그인</Link>
    const signupLink = <Link to="/signup">회원가입</Link>


    if (!isLogined) {
        if (location.pathname === '/login') {
            return signupLink;
        }
        if (location.pathname === '/signup') {
            return loginLink;
        }
        return (
            <HeaderAuthMenuWrapper>
                {loginLink}
                {signupLink}
            </HeaderAuthMenuWrapper>
        );
    }

    if(isLogined){
    return (
        <HeaderAuthMenuWrapper>
            {`${nickname}님 환영합니다.`}
            {profileImagePath && (
                <img
                    width={48}
                    height={48}
                    src={`${import.meta.env.VITE_API_BASE_URL}${profileImagePath}`}
                    style={{ borderRadius: '999px' }}
                    alt="Profile"
                />
            )}
            <Flex gap={8} style={{ cursor: 'pointer' }} onClick={handleLogout}>
                <img src={LogoutSvg} width={24} height={24} alt="Logout" />
                <p>로그아웃</p>
            </Flex>
        </HeaderAuthMenuWrapper>
    );
    }
};

export default HeaderAuthMenu;