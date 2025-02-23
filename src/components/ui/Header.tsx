
import { styled } from "styled-components";
import BallSvg from "@assets/baseball.svg";
import { useAtom, useSetAtom } from "jotai";
import SunSvg from "../../assets/sun.svg";
import MoonSvg from "../../assets/moon.svg";
import HambergerSvg from "../../assets/hamburger.svg";
import HeaderAuthMenu from "./HeaderAuthMenu";
import { isResponsiveNavOpenAtom } from "../../store/isResponsiveNavOpen";
import { isDarkModeAtom } from "../../store/isDarkMode";


const HeaderContainer = styled.header`
    height : 64px;    
    display : flex;
    align-items : center; 
    justify-content : space-between;
`

const Title = styled.h1`
    font-family: "College";
    font-size: 40px;
    color: #0073FF;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3), 0px 4px 6px rgba(0, 100, 255, 0.2);
    @media screen and (max-width : 575px){
        font-size : 5vw;
    }
`

const TitleWrapper = styled.div`
    display : flex;
    flex-direction : flex-start;
    align-items : center;
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

const HambergerMenu = styled.img`
    
    width : 40px;
    height : 40px;
    display : none;
    @media screen and (max-width : 575px){
        display : block;
    
    }


`

export default function Header() {

    const [isDarkMode, setIsDarkMode] = useAtom(isDarkModeAtom);
    const setIsResponsiveNavOpen = useSetAtom(isResponsiveNavOpenAtom);

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
            <HeaderAuthMenu/>
            <HambergerMenu src={HambergerSvg} onClick={()=>setIsResponsiveNavOpen((prev) => !prev)}/>
            </AuthLinksWrapper>
        </HeaderContainer>
    );
}

