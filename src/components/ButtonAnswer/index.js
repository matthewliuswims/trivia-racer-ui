import React from "react"

// Styled
import { StyledButtonAnswer } from "./styled"

const variants = {
  correct: { scale: [1, 1.25, 1] },
  default: { scale: 1 },
}

const ButtonAnswer = ({ answer = {}, onClick }) => {
  return (
    <StyledButtonAnswer
      onClick={() => onClick(answer)}
      animate={answer.animateState}
      variants={variants}
      transition={{ duration: 1.25 }}
    >
      {answer.name}
    </StyledButtonAnswer>
  )
}

export default ButtonAnswer
