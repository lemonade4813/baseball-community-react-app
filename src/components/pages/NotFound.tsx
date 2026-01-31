import { styled } from "styled-components"
import BatsBallSvg from "@/assets/batsball.png"
import { Flex } from "@/styles/Styles"


const ErrorText = styled.p`
    font-size : 48px;
    border-left : 4px solid #DC143C;
    padding-left : 48px;

`

export default function NotFound() {
  return (
    <Flex style={{height : '100vh'}} gap={48}>
        <img src={BatsBallSvg} width={200} height={200}/>
        <ErrorText>404 Not Found</ErrorText>
    </Flex>
  )
}
