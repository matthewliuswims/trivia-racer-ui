import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

export const StyledHeader = styled.header`
  background: ${props => props.theme.colorBlue};
  margin-bottom: 1.45em;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em;
`

export const StyledHeader__Link = styled(props => <Link {...props} />)`
  color: white;
  text-decoration: none;
`
