import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
  top: 3rem;
`;

export const Input = styled.input`
  font-size: 1rem;
  font-family: Arial, sans-serif;

  width: 25rem;
  padding: 0.8rem 1rem;

  background: #eee;
  border: 1px solid #eee;
  border-radius: 10px;
  color: #666;

  &::placeholder {
    color: #222;
  }

  &:focus {
    outline: 2px solid #522060;
    border-radius: 0;
    color: #222;

    transition: outline 2s ease-in-out;
  }
`;

export const Button = styled.button`
  font-size: 1rem;
  font-family: Arial, sans-serif;
  border-radius: 10px;
  margin: 0.3px;
  padding: 0.8rem 1rem;
  border: white;
`;

export const ListContainer = styled.ul`
  list-style-type: none;
  padding: 0;
`;
