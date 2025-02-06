import { Link, useNavigate } from "react-router-dom"
import { styled } from "styled-components";
import BallSvg from "../assets/baseball.svg";
import { removeAccessToken } from "../util/auth";
import LogoutSvg from "../assets/logout.svg";
import { useAuth } from "../contexts/auth/Authcontext";

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

    const { isLogined, setIsLogined } = useAuth();

    const handleLogout = () => {

        removeAccessToken();
        setIsLogined(false);
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
                    <div style={{display : 'flex',alignItems : 'center', gap : '8px'}}>
                        <img src={LogoutSvg} onClick={handleLogout} width={24} height={24}/>
                        <p>로그아웃</p>
                    </div>
                }
            </AuthLinksWrapper>
        </HeaderContainer>
    );
}
