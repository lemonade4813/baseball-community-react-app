import { Outlet } from "react-router-dom";
import { styled } from "styled-components";
const Title = styled.h2`
  align-self: flex-start;
  color: #444;
  font-size : 36px;
  margin-top : 20px;
`;

export default function Stadium() {
    return (
        <div>
            <Title>경기장 정보</Title>
            <Outlet/>
        </div>
    )
  }
  