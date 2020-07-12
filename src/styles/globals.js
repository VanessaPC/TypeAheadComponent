import { css, keyframes } from "styled-components";
import { BLUE, BABY_BLUE } from "./colors";

export const NewOutline = css`
  border: 2px solid ${BLUE};
  box-shadow: 0px 0px 2px 3px ${BABY_BLUE};
`;

export const bounceIn = keyframes`{
    0% {
        opacity: 0;
        transform: scale3d(0.3, 0.3, 0.3);
      }
    
      50% {
        opacity: 0;
      }
      100%{
          opacity: 1;
      }
  }`;
