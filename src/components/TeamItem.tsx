import { css, styled } from "styled-components"
import { Team } from "../util/filterItems"


const TeamItemWrapper = styled.button<{isSelected : boolean}>`
    display : flex;
    align-items : center;
    width : 120px;
    height : 60px;
    gap : 20px;
    cursor : pointer;
    font-size : 14px;
    padding-top : 4px;
    padding-left : 10px;
    padding-top : 4px;
    background-color : #BFDAF7;

    ${({ isSelected }) =>
      isSelected &&
        css`
          background-color: red;
          color: #fff;
        `};
        
    line-height : 150%;
   
    &:first-child {
      border-top-left-radius : 8px;
      border-bottom-left-radius : 8px;
      background-color : #D1C4E9;
      ${({ isSelected }) =>
      isSelected &&
        css`
          background-color: red;
          color: #fff;
        `};
    }

    &:last-child {
      border-top-right-radius : 8px;
      border-bottom-right-radius : 8px;
    }

    &:first-child > p {
      font-size : 18px;
    }
`

export default function TeamItem({name, src, team, onClick, selectedTeam} : {name : string, src : string, team : Team, onClick : (i : Team)=> void, selectedTeam : string}) {
  
  const teamName = name.split(' ');

  return (
    <TeamItemWrapper onClick={() => onClick(team)} isSelected={selectedTeam === team}>
        <img src={src} width={40} height={40}/>
        <div>
          <p>{teamName[0]}</p>
          <p>{teamName[1]}</p>
        </div>
    </TeamItemWrapper>
  )
}
