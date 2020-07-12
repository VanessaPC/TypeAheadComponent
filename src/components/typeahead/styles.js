import styled from "styled-components";
import { WHITE_D, GREY_2, BLUE, WHITE, CYAN_BLUE } from "../../styles/colors";
import { PHONE, TABLET } from "../../styles/queries";
import { NewOutline } from "../../styles/globals";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;
  top: 3rem;

  ${PHONE} {
    width: 17rem;
  }
  ${TABLET} {
    width: 35rem;
  }

  width: 45rem;
  margin: 0 auto;
`;

export const InputContainer = styled.div`
  position: relative;
`;

export const Input = styled.input`
  font-size: 2rem;
  padding: 0.8rem 1rem;
  width: 100%;
  background: ${WHITE};
  border: 2px solid ${WHITE};
  border-radius: 10px;
  box-shadow: 4px 0px 60px ${WHITE_D};

  &::placeholder {
    color: ${GREY_2};
  }

  &:hover {
    border: 2px solid ${BLUE};
  }

  &:focus {
    ${NewOutline}
  }
`;

export const Button = styled.button`
  border-radius: 30px;
  padding: 0.9rem 1rem;
  border: 2px solid ${WHITE};
  position: absolute;
  top: 6px;
  right: 11px;
  background: ${CYAN_BLUE};

  display: flex;
  align-items: center;
  justify-content: center;

  &:focus {
    outline: none;
    ${NewOutline}
  }
`;

export const ListContainer = styled.ul`
  position: absolute;
  left: 0;
  right: 0;
  top: 60px;
  list-style-type: none;
  padding: 0;

  overflow: auto;
  height: 400px;

  background: ${WHITE};
  border-radius: 10px;
`;
