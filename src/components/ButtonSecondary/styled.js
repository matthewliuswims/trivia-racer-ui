import styled from "styled-components"

export const StyledButtonSecondary = styled.button`
  cursor: pointer;
  color: black;
  font-weight: bold;
  background-color: ${props => props.theme.turquoise};
  border-radius: 5px;
  padding: 0.5em 2em;
  border: 1px solid ${props => props.theme.lightGrey};
  font-size: 1.2em;

  &:hover {
    box-shadow: 0.25px 0.25px 0.25px 0.25px rgba(0, 0, 0, 0.25);
  }
`
