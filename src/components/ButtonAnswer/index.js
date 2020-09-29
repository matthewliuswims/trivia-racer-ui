import React from "react"
import he from "he"
import { connect } from "react-redux"

// Styled
import {
  StyledButtonAnswer,
  StyledButtonTooltip,
  StyledWrapper,
  StyledButtonTooltip__Bubble,
  StyledButtonTooltip__Bubble__Text,
} from "./styled"

// Selectors
import { selectScore } from "../../state/game"

const renderToolTip = (animateState, chosen, score) => {
  if (!chosen) return null

  if (animateState === "correct") {
    return (
      <StyledButtonTooltip>
        <StyledButtonTooltip__Bubble animate={animateState}>
          <StyledButtonTooltip__Bubble__Text>
            +1
          </StyledButtonTooltip__Bubble__Text>
        </StyledButtonTooltip__Bubble>
      </StyledButtonTooltip>
    )
  }

  if (animateState === "incorrect") {
    return (
      <StyledButtonTooltip>
        <StyledButtonTooltip__Bubble animate={animateState}>
          {score === 0 ? (
            <StyledButtonTooltip__Bubble__Text>
              -0
            </StyledButtonTooltip__Bubble__Text>
          ) : (
            <StyledButtonTooltip__Bubble__Text>
              -1
            </StyledButtonTooltip__Bubble__Text>
          )}
        </StyledButtonTooltip__Bubble>
      </StyledButtonTooltip>
    )
  }
  return null
}

const ButtonAnswer = ({ answer = {}, onClick, score }) => {
  return (
    <StyledWrapper>
      {renderToolTip(answer.animateState, answer.chosen, score)}
      <StyledButtonAnswer
        onClick={() => onClick(answer)}
        animate={answer.animateState}
      >
        {he.decode(answer.name)}
      </StyledButtonAnswer>
    </StyledWrapper>
  )
}

const mapStateToProps = state => {
  return {
    score: selectScore(state),
  }
}

export default connect(mapStateToProps)(ButtonAnswer)
