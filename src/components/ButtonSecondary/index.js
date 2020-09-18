import React from "react"

// Styled
import { StyledButtonSecondary } from "./styled"

const ButtonSecondary = ({ children, ...rest }) => {
  return <StyledButtonSecondary {...rest}>{children}</StyledButtonSecondary>
}

export default ButtonSecondary
