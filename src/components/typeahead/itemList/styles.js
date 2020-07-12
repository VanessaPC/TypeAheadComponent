import styled from "styled-components";
import { BLUE, BABY_BLUE, CYAN_BLUE } from "../../../styles/colors";
import { bounceIn } from "../../../styles/globals";

export const BoldPart = styled.span`
  font-weight: 800;
`;

export const Item = styled.li`
  font-size: 1.2rem;
  border: 2px solid transparent;
  border-radius: 10px;
  padding: 1rem 0.5rem;
  opacity: 0;

  &:focus {
    outline: none;
    border: 2px solid ${BLUE};
    background: ${BABY_BLUE};
  }

  &:hover {
    background: ${CYAN_BLUE};
    transition: background 0.2s ease-in-out;
  }

  animation: ${bounceIn} 0.2s;
  ${({ index }) => index && `animation-delay: .${index}s`};
  animation-fill-mode: forwards;
`;
