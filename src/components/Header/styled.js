import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

export const StyledHeader = styled.header`
  background: ${props => props.theme.colorBlue};
  display: flex;
  align-items: center;
  padding: 1em 2em;
`

export const StyledHeader__Link = styled(props => <Link {...props} />)`
  color: white;
  text-decoration: none;
`

export const StyledHeader__HeaderRightWrapper = styled.div`
  position: absolute;
  right: 1em;
`
