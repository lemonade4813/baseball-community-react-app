import { css, styled } from "styled-components"
import { Team } from "@/util/filterItems"


const TeamItemWrapper = styled.button<{isSelected : boolean}>`
    display : flex;
    align-items : center;
    justify-content : center;
    flex-wrap : wrap;
    gap : 40px;



    width : 200px;
    height : 48px;

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
        <div>
          <p>{name}</p>
        </div>
    </TeamItemWrapper>
  )
}
