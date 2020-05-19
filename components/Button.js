import styled from "@emotion/styled";

const Button = styled.button`
  margin: 1rem 1rem 0 0;
  font-size: 1.3rem;
  transition: all 0.2s ease;
  padding: 0.5rem 2.5rem;
  background: none;
  color: #111111;
  border: 1.5px solid #111111;
  cursor: pointer;
  &:hover {
    background: #111111;
    color: #ffffff;
  }
  &:focus {
    outline: none;
  }
`;

export default Button;
