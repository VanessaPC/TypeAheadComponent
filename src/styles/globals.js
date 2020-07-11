import { css, keyframes } from "styled-components";
import { MINT, LIGHT_MINT } from "./colors";

export const Outline = css`
  border: 2px solid ${MINT};
  box-shadow: 0px 0px 3px 4px ${LIGHT_MINT};
`;

export const bounceIn = keyframes`{
    from {
        opacity: 0;
        transform: translate3d(0, -100%, 0);
      }
    
      to {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
  }`;
