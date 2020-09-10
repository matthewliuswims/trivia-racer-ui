import React from "react"
import he from "he"

// Styled
import { StyledGameQuestion } from "./styled"

const GameQuestion = ({ question = "", onClick }) => {
  return (
    <StyledGameQuestion onClick={onClick}>
      {he.decode(question)}
    </StyledGameQuestion>
  )
}

export default GameQuestion
