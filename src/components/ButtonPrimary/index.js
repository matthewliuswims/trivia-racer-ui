import React from "react"

// Styled
import { StyledButtonPrimary } from "./styled"

const ButtonPrimary = ({ name, ...rest }) => {
  return <StyledButtonPrimary {...rest}>{name}</StyledButtonPrimary>
}

export default ButtonPrimary
