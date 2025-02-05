import { css, styled } from "styled-components"
import { Team } from "../util/filterItems"


const TeamItemWrapper = styled.button<{isSelected : boolean}>`
    display : flex;
    align-items : center;
    flex-wrap : wrap;

    width : 120px;
    gap : 8px;
    cursor : pointer;
    font-size : 14px;
    padding-top : 4px;
    padding-left : 10px;
    background-color : transparent;

    border : none;
    line-height : 150%;
    border : 2px solid #DDD;

    ${({ isSelected }) =>
      isSelected &&
        css`
          background-color: red;
          color: #fff;
        `};
        
    
`

export default function TeamItem({name, src, team, onClick, selectedTeam} :
                                  {name : string, src : string, team : Team, onClick : (value : Team)=> void, selectedTeam : string}) {
  
  const teamName = name.split(' ');

  return (
    <TeamItemWrapper 
        type="button" 
        onClick={() => onClick(team)} 
        isSelected={selectedTeam === team}
    >
        <img src={src} width={40} height={40}/>
        <div>
          <p>{teamName[0]}</p>
          <p>{teamName[1]}</p>
        </div>
    </TeamItemWrapper>
  )
}
