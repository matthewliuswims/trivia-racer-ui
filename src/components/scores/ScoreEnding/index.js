import React from "react"

// Styles
import { StyledScoreEnding, StyledScoreEnding__Title } from "./styled"

import Form from "../../Form"
import ScoreCurrent from "../ScoreCurrent"

const ScoreEnding = ({ score, saveScore }) => {
  return (
    <StyledScoreEnding>
      <StyledScoreEnding__Title>
        Congragulations, your score on Trivia Racer is:
      </StyledScoreEnding__Title>
      <ScoreCurrent display={score} />
      <Form saveScore={saveScore} />
    </StyledScoreEnding>
  )
}

export default ScoreEnding
