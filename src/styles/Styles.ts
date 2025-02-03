import { styled } from "styled-components";

export const InputWrapper = styled.div`
    display : flex;
    gap : 20px;
    width : 100%;
    align-items : center;
`
export const Label = styled.label`



`
export const Input = styled.input`
    border-radius : 8px;
    height : 32px;
    flex : 1 0 0;
    border : 1px solid #D3D3D3;
`

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