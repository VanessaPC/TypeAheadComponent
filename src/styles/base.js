import { createGlobalStyle } from "styled-components";
import { typography } from "./typography";

export const BaseCSS = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: border-box;
    }

    body{
        background: AliceBlue;
    }
    ${typography}

`;
