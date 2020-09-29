import React from "react"

// Styles
import {
  StyledWrapper,
  StyledScoreHeader,
  StyledScoreHeader__ToolTip,
  StyledScoreHeader__ToolTip__Bubble,
} from "./styled"

const ScoreHeader = ({ children, showToolTip = false, ...rest }) => {
  if (showToolTip) {
    return (
      <StyledWrapper>
        <StyledScoreHeader__ToolTip>
          <StyledScoreHeader__ToolTip__Bubble>
            Score
          </StyledScoreHeader__ToolTip__Bubble>
        </StyledScoreHeader__ToolTip>
        <StyledScoreHeader {...rest}>{children}</StyledScoreHeader>
      </StyledWrapper>
    )
  }
  return <StyledScoreHeader {...rest}>{children}</StyledScoreHeader>
}

export default ScoreHeader
