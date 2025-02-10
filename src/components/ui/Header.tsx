import { Link, useNavigate } from "react-router-dom"
import { styled } from "styled-components";
import BallSvg from "@assets/baseball.svg";
import LogoutSvg from "@assets/logout.svg";
import axiosInstance from "../../util/axiosIntance";
import { useUserInfo } from "../../store/useUserInfoStore";
import { useShallow }  from 'zustand/shallow';
import { Flex } from "../../styles/Styles";


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
    gap : 24px;
    margin-right : 30px;
    font-size : 16px;

    & > a:first-child {
        border-right : 2px solid #D3D3D3;
        padding-right : 20px;
    }
`


export default function Header() {

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

    return (
        <HeaderContainer>
            <TitleWrapper>
                <Title>
                    Inside The Park
                </Title>
                <img src={BallSvg} width={30}/>
            </TitleWrapper>
            <AuthLinksWrapper>
                {!isLogined ? 
                    <>
                        <Link to="/login">로그인</Link>
                        <Link to="/signup">회원가입</Link>
                    </>
                    :
                    <Flex style={{ gap : '16px'}}>
                        {`${nickname}님 환영합니다.`}
                        {profileImagePath && 
                            <img 
                                width={48} 
                                height={48} 
                                src={`${import.meta.env.VITE_API_BASE_URL}${profileImagePath}`}
                                style={{borderRadius : '999px'}}
                            />}
                        <Flex style={{gap : '8px', cursor : 'pointer'}} onClick={handleLogout}>
                            <img src={LogoutSvg}  width={24} height={24}/>
                            <p>로그아웃</p>
                        </Flex>
                    </Flex>
                }
            </AuthLinksWrapper>
        </HeaderContainer>
    );
            }

