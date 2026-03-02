import { css, styled } from "styled-components"
import { Team } from "@/util/filterItems"


const TeamItemWrapper = styled.button<{isSelected : boolean}>`
    display : flex;
    align-items : center;
    justify-content : space-between;
    flex-wrap : wrap;
    padding-left : 20px;
    padding-right : 20px;


    width : 200px;
    height : 48px;

    cursor : pointer;
    font-size : 14px;
    padding-top : 4px;
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

const TeamName = styled.div`
  display: flex;
  width : 80px;
  justify-content : center;

`

export default function TeamItem({name, src, team, onClick, selectedTeam, onClose} :
                                  {name : string, 
                                   src : string, 
                                   team : Team, 
                                   onClick : (value : Team)=> void, 
                                   onClose : () => void;
                                   selectedTeam : string}) {
  

  return (
    <TeamItemWrapper 
        type="button" 
        onClick={() => 
                  {
                    onClick(team)
                    onClose();
                  }} 
        isSelected={selectedTeam === team}
    >
        <img src={src} width={24} height={24}/>
        <TeamName>
          <p>{name}</p>
        </TeamName>
    </TeamItemWrapper>
  )
}
