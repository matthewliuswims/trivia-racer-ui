import React from "react"

// Styles
import { StyledScoreHeader } from "./styled"

const ScoreHeader = ({ children, ...rest }) => {
  return <StyledScoreHeader {...rest}>{children}</StyledScoreHeader>
}

export default ScoreHeader
