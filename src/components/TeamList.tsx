import Bears from "../assets/team/bears.webp";
import Dinos from "../assets/team/dinos.svg";
import Eagles from "../assets/team/eagles.svg";
import Giants from "../assets/team/giants.svg";
import Landers from "../assets/team/landers.svg";
import Lions from "../assets/team/lions.svg";
import Twins from "../assets/team/twins.svg";
import Tigers from "../assets/team/tigers.svg";
import Wiz from "../assets/team/wiz.svg";
import Heroes from "../assets/team/heroes.svg";
import TeamItem from "./TeamItem";
import { styled } from "styled-components";


const teamImgList = [
    {src : Bears, name : '두산 베어스'},
    {src : Dinos, name : 'NC 다이노스'},
    {src : Eagles, name : '한화 이글스'},
    {src : Giants, name : '롯데 자이언츠'},
    {src : Tigers, name : '기아 타이거즈'},
    {src : Landers, name : 'SSG 랜더스'},
    {src : Lions, name : '삼성 라이온스'},
    {src : Twins, name : 'LG 트윈스'},
    {src : Wiz, name : 'KT 위즈'},
    {src : Heroes, name : '키움 히어로즈'},
]

const TeamListWrapper = styled.div`
  width : 90%;
  display : flex;
  gap : 20px;
  margin-left : 20px;
  margin-right : 20px;
  justify-content : space-between;
  border-radius : 8px;
  background-color : #BFDAF7;
  padding : 8px;

  & > * {
      border-right : 1px solid #999999;
      padding-right : 5px;

      &:last-child{
        border-right : none;
      }
  }
`


export default function TeamList() {
  
  return (
    <TeamListWrapper>
        {teamImgList.map((team) => 
            <TeamItem {...team}/>
        )}
    </TeamListWrapper>
  )
}
