import React from "react"

// Styled
import { StyledButtonSecondary } from "./styled"

const ButtonSecondary = ({ name, ...rest }) => {
  return <StyledButtonSecondary {...rest}>{name}</StyledButtonSecondary>
}

export default ButtonSecondary
