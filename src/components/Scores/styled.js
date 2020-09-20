import styled from "styled-components"
import { DESKTOP_MIN_WIDTH } from "../constants"

export const StyledScores = styled.section`
  margin-top: 4em;
  @media ${DESKTOP_MIN_WIDTH} {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export const StyledScores__Content = styled.div`
  width: 240px;
  margin-bottom: 1em;
  margin-top: 3em;

  @media ${DESKTOP_MIN_WIDTH} {
    margin: 40px;
  }
`
