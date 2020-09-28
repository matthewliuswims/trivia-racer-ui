import React from "react"
import he from "he"

// Styled
import { StyledButtonAnswer } from "./styled"

const ButtonAnswer = ({ answer = {}, onClick }) => {
  return (
    <StyledButtonAnswer
      onClick={() => onClick(answer)}
      animate={answer.animateState}
    >
      {he.decode(answer.name)}
    </StyledButtonAnswer>
  )
}

export default ButtonAnswer
