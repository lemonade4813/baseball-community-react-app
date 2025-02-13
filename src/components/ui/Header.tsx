import { Link, useLocation, useNavigate } from "react-router-dom"
import { styled } from "styled-components";
import BallSvg from "@assets/baseball.svg";
import LogoutSvg from "@assets/logout.svg";
import axiosInstance from "../../util/axiosIntance";
import { useUserInfo } from "../../store/useUserInfoStore";
import { useShallow }  from 'zustand/shallow';
import { Flex } from "../../styles/Styles";
import { useAtom } from "jotai";
import { isDarkModeAtom } from "../../store/IsDarkMode";
import SunSvg from "../../assets/sun.svg";
import MoonSvg from "../../assets/moon.svg";


const HeaderContainer = styled.header`
    height : 64px;    
    display : flex;
    align-items : center; 
    justify-content : space-between;
`

const Title = styled.h1`
    font-family: "College";
    font-size: 40px;
    margin-left: 30px;
    color: #0073FF;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3), 0px 4px 6px rgba(0, 100, 255, 0.2);
`

const TitleWrapper = styled.div`
    display : flex;
    gap : 10px;
`

const AuthLinksWrapper = styled.div`
    display : flex;
    align-items : center;
    gap : 24px;
    margin-right : 30px;
    font-size : 16px;

    & > a:first-child {
        border-right : 2px solid #D3D3D3;
        padding-right : 20px;
    }

    & > a:last-child {
        border : none;
        padding-right : 0;
    }
`

export default function Header() {

    const navigate = useNavigate();

    const location = useLocation();

    const [isDarkMode, setIsDarkMode] = useAtom(isDarkModeAtom);

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


    const HeaderAuthButtons = () => {
        if (!isLogined) {
            if (location.pathname === '/login') {
                return signupLink;
            }
            if (location.pathname === '/signup') {
                return loginLink;
            }
            return (
                <>
                    {loginLink}
                    {signupLink}
                </>
            );
        }
    
        if(isLogined){
        return (
            <Flex gap={16}>
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
            </Flex>
        );
        }
    };
    return (
        <HeaderContainer>
            <TitleWrapper>
                <Title>
                    Inside The Park
                </Title>
                <img src={BallSvg} width={30}/>
            </TitleWrapper>       
            <AuthLinksWrapper>
            <img 
                src={isDarkMode ? MoonSvg : SunSvg} 
                width={30} 
                height={30} 
                onClick={() => setIsDarkMode(!isDarkMode)}
            />
                {HeaderAuthButtons()}
            </AuthLinksWrapper>
        </HeaderContainer>
    );
    }

