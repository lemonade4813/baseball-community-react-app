import { styled } from "styled-components"
import SpinnerSvg from "@/assets/Spinner.svg"


export const SpinnerOverlay = styled.div`
    position :fixed;
    top : 0;
    left : 0;
    bottom : 0;
    right : 0; 
`
const SpinnerImg  = styled.img`

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

export const SpinnerComponent = () => 
    (
        <SpinnerOverlay>
            <SpinnerImg src={SpinnerSvg} data-testId="spinner"/>
        </SpinnerOverlay>
    )
