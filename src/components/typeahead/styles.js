import styled from "styled-components";
import { WHITE_D, GREY_2, LIGHT_MINT, WHITE } from "../../styles/colors";
import { PHONE, TABLET } from "../../styles/queries";
import { Outline } from "../../styles/globals";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  top: 3rem;
`;

export const InputContainer = styled.div`
  position: relative;
`;

export const Input = styled.input`
  font-size: 2rem;
  ${PHONE} {
    width: 17rem;
  }
  ${TABLET} {
    width: 35rem;
  }

  width: 45rem;
  padding: 0.8rem 1rem;

  background: ${WHITE};
  border: 2px solid ${WHITE};
  border-radius: 10px;
  box-shadow: 4px 0px 60px ${WHITE_D};

  &::placeholder {
    color: ${GREY_2};
  }

  &:hover {
    border: 2px solid ${LIGHT_MINT};
  }

  &:focus {
    ${Outline}
  }
`;

export const Button = styled.button`
  font-size: 1rem;
  border-radius: 20px;
  margin: 0.3px;
  padding: 0.8rem 1rem;
  border: white;
  position: absolute;
  top: 10px;
  right: 11px;
  background: ${LIGHT_MINT};
  color: ${WHITE};
`;

export const ListContainer = styled.ul`
  list-style-type: none;
  padding: 0;
`;
