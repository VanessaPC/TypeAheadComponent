import { css } from "styled-components";
import { GREY_2 } from "./colors";
const PRIMARY_FONT = "Arial, sans-serif";

export const typography = css`
  * {
    text-align: left;
  }

  body {
    font-family: ${PRIMARY_FONT};
    font-size: 1rem;
    line-height: 1.25rem;
    letter-spacing: 0;
    font-weight: normal;
    text-align: left;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6, p {
    color: ${GREY_2};
  }

  h1 {
    font-family: '${PRIMARY_FONT}';
    font-size: 1.75rem;
    line-height: 2.25rem;
    font-weight: 700;
  }

  p{
    font-size: 0.8125rem;
    line-height: 1rem;
    letter-spacing: 0.02rem;
  }


  button {
    text-align: center;
    font-family: '${PRIMARY_FONT}';
  }


  h5 {
    font-family: '${PRIMARY_FONT}';
    font-size: 1rem;
    line-height: 1.25rem;
    letter-spacing: 0.01rem;
  }

  caption {
    font-family: '${PRIMARY_FONT}';
    line-height: 0.75rem;
    font-size: 0.625rem;
    letter-spacing: 0.03rem;
  }

  input {
    font-size: 1rem;
    line-height: 1.25rem;
    background: inherit;
    border: none;
    &:focus {
      outline: none;
    }
  }

`;
