import { styled } from "styled-components";

export const InputWrapper = styled.div`
    display : flex;
    gap : 20px;
    width : 100%;
    align-items : center;
`
export const Label = styled.label`
    width : 80px;


`
export const Input = styled.input<{ border?: string }>`
  border-radius: 8px;
  height: 32px;
  flex: 1 0 0;
  border: 1px solid ${({ border }) => border || "#D3D3D3"};
`;

export const Textarea = styled.textarea`
    border : 1px solid #D3D3D3;
    flex : 1 0 0;
    border : 1px solid #D3D3D3;
    height : 400px;
    border-radius : 8px;
`

export const Button = styled.button`
    border : none;
    background-color : #B80000;
    height : 48px;
    width : 100%;
    border-radius : 8px;
    color : white;
`

export const Flex = styled.div`
    display : flex;
    align-items: center;
    justify-content : center;
    gap : 20px;
`

export const Container = styled.main`
    display : flex;
    align-items: center;
    justify-content : center;

`

export const H2 = styled.main`
    font-weight : 600;
    font-size : 25px;
    margin-top : 30px;
`