import styled from "styled-components"
import { DESKTOP_MIN_WIDTH } from "../../constants"

export const StyledScoreHeader = styled.h2`
  color: white;
  @media ${DESKTOP_MIN_WIDTH} {
    padding-right: 24px;
  }
`

export const StyledWrapper = styled.div`
  position: relative;
`

export const StyledScoreHeader__ToolTip = styled.div`
  position: absolute;
  z-index: 2;
  right: -5px;

  @media ${DESKTOP_MIN_WIDTH} {
    right: 20px;
  }
  top: 55px;
`

export const StyledScoreHeader__ToolTip__Bubble = styled.div`
  color: white;
  position: relative;
  background: ${props => props.theme.purple};
  border-radius: 0.4em;
  width: 5em;
  height: 3em;
  display: flex;
  justify-content: center;
  align-items: center;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 39px solid transparent;
    border-bottom-color: ${props => props.theme.purple};
    border-top: 0;
    border-right: 0;
    margin-left: -14.5px;
    margin-top: -29px;
  }
`
