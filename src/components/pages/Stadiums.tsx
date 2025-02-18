import { Outlet } from "react-router-dom";
import StadiumSvg from "../../assets/stadium.svg";
import { Container, Title } from "../../styles/Styles";


export default function Stadiums() {
    return (
        <Container>
            <Title>
              <img src={StadiumSvg} width={40} height={40} alt="경기장 이미지"/>
              <span>경기장 정보</span>
            </Title>
            <Outlet/>
        </Container>
    )
  }
  