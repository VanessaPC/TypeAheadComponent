import styled from "styled-components";

export const BoldPart = styled.span`
  font-weight: 800;
`;

export const Item = styled.li`
  font-size: 1rem;
  font-family: Arial, sans-serif;

  padding: 1rem 0.3rem;

  &:focus {
    background: #d9f2e6;

    outline: 1px solid #94dbc0;
    border-radius: 0;
    color: #222;
  }

  // &:active {
  //   background: #9ccee7;
  // }

  &:hover {
    background: #b6e7cb;
  }
`;
