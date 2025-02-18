import { styled } from "styled-components";

export const InputWrapper = styled.div`
    // display : flex;
    // gap : 20px;
    // align-items : center;
    // justify-content : center;

    display : flex;
    gap : 20px;
    align-items : center;
    justify-content : center;
    width : 100%;

`
export const Label = styled.label`
    width : 80px;
`
export const Input = styled.input<{ border?: string }>`
  border-radius: 8px;
  height: 32px;
  flex: 1;
  border: 1px solid ${({ border }) => border || "#D3D3D3"};
`;

export const Textarea = styled.textarea`
    // border : 1px solid #D3D3D3;
    // flex : 1 0 0;
    // border : 1px solid #D3D3D3;
    // height : 400px;
    // border-radius : 8px;

    border-radius: 8px;
    flex: 1;
    border: 1px solid #D3D3D3;
    padding: 8px;
    min-height: 100px;
    height : 400px;
    resize: vertical;
`

export const Button = styled.button`
    border : none;
    background-color : #B80000;
    width : 120px;
    height : 40px;
    border-radius : 8px;
    color : white;
`

export const Flex = styled.div<{ gap?: number }>`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({ gap = 20 }) => `${gap}px`};
`;

export const Container = styled.main`
    display : flex;
    align-items: center;
    justify-content : center;
    flex-direction : column;
    padding-bottom : 80px;

`

export const H2 = styled.main`
    font-weight : 600;
    font-size : 25px;
    margin-top : 30px;
`

export const Title = styled.h2`
  align-self : flex-start;
  margin-top : 40px;
  margin-bottom : 40px;
  font-size : 32px;
  display : flex;
  align-items: center;
  gap : 8px;
`