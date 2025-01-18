import { styled } from "styled-components"

const TeamItemWrapper = styled.div`
    display : flex;
    align-items : center;
    width : 120px;
    height : 60px;
    gap : 20px;
    cursor : pointer;
    font-size : 14px;
`

export default function TeamItem({name, src} : {name : string, src : string}) {
  return (
    <TeamItemWrapper>
        <img src={src} width={40} height={40}/>
        <p>{name}</p>
    </TeamItemWrapper>
  )
}
