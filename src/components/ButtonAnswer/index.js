import React from "react"
import he from "he"

// Styled
import { StyledButtonAnswer } from "./styled"

const variants = {
  correct: { scale: [1, 1.1, 1] },
  unchosen: { scale: 1 },
  incorrect: { scale: 1 },
}

const ButtonAnswer = ({ answer = {}, onClick }) => {
  return (
    <StyledButtonAnswer
      onClick={() => onClick(answer)}
      animate={answer.animateState}
      variants={variants}
      transition={{ duration: 0.75 }}
    >
      {he.decode(answer.name)}
    </StyledButtonAnswer>
  )
}

export default ButtonAnswer
