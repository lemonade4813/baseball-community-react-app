import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Pretendard from "../fonts/PretendardVariable.woff2";
import College from "../fonts/College.woff2";

const Globalstyles = createGlobalStyle`
    ${reset}

    @font-face {
        font-family: "Pretendard";
        src: url(${Pretendard}) format("woff2");
      }

    @font-face {
        font-family: "College";
        src: url(${College}) format("woff2");
    }  

    body {
        font-family : 'Pretendard';
    }
    
    a{
        text-decoration : none;
        color : inherit;
    }

    textarea{
        font-family : 'Pretendard';
    }

`

export default Globalstyles;