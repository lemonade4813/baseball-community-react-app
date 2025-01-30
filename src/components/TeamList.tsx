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

import BaseBall from "../assets/baseball.svg";
import { Team } from "../util/filterItems";

type TeamImgList = {
  src : string,
  name : string,
  team : Team;
}[]

const teamImgList : TeamImgList = [
    {src : BaseBall, name : '전체 일정', team : ''},
    {src : Bears, name : '두산 베어스', team : '두산'},
    {src : Dinos, name : 'NC 다이노스', team : 'NC'},
    {src : Eagles, name : '한화 이글스', team : '한화'},
    {src : Giants, name : '롯데 자이언츠', team : '롯데'},
    {src : Tigers, name : '기아 타이거즈', team : 'KIA'},
    {src : Landers, name : 'SSG 랜더스', team : 'SSG'},
    {src : Lions, name : '삼성 라이온스', team : '삼성'},
    {src : Twins, name : 'LG 트윈스', team : 'LG'},
    {src : Wiz, name : 'KT 위즈', team : 'KT'},
    {src : Heroes, name : '키움 히어로즈', team : '키움'},
]

const TeamListWrapper = styled.div`
  width : 90%;
  display : flex;
  margin-left : 20px;
  margin-right : 20px;
  justify-content : space-between;


  & > * {
      border-right : 1px solid #999999;
      padding-right : 5px;

      &:last-child{
        border-right : none;
      }
  }
`

interface ITeamList{

  onClick : (i : Team)=> void;
  selectedTeam : string;

}

export default function TeamList( props : ITeamList) {
  

  return (
    <TeamListWrapper>
        {teamImgList.map((team, index) => 
            <TeamItem key={index} {...props} {...team}  />
        )}
    </TeamListWrapper>
  )
}
