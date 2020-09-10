import React from "react"

// Components
import ButtonAnswer from "../ButtonAnswer"

const GameAnswers = ({ answers = [], onClick }) => {
  return answers.map(answer => {
    return <ButtonAnswer answer={answer} key={answer.id} onClick={onClick} />
  })
}

export default GameAnswers
