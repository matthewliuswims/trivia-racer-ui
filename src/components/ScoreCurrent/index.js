import React from "react"

// Styled
import { StyledScore } from "./styled"

const ScoreCurrent = ({ score }) => {
  return <StyledScore>{`Score: ${score}`}</StyledScore>
}

export default ScoreCurrent
