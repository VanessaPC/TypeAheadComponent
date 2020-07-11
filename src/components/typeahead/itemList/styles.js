import styled from "styled-components";
import { GREY_2, LIGHT_MINT, MINT, WHITE_MINT } from "../../../styles/colors";
import { bounceIn } from "../../../styles/globals";

export const BoldPart = styled.span`
  font-weight: 800;
`;

export const Item = styled.li`
  font-size: 1rem;
  font-family: Arial, sans-serif;
  padding: 1rem 0.3rem;

  &:focus {
    background: ${WHITE_MINT};

    outline: 1px solid ${MINT};
    border-radius: 0;
    color: ${GREY_2};
  }

  &:hover {
    background: ${LIGHT_MINT};
    outline: 1px solid ${MINT};
  }

  animation: ${bounceIn} 0.2s;
`;
