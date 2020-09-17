import styled from "styled-components"

export const StyledInput = styled.input`
  margin-top: 1em;
  margin-bottom: 1em;
  border-radius: 4px;
  padding: 5px;
  border: 1px solid ${props => props.theme.lightGrey};
  font-size: 1.2em;
`

export const StyledLabel = styled.label`
  font-size: 1.2em;
`

export const StyledForm = styled.form`
  margin-top: 1em;
  margin-bottom: 2em;
`
