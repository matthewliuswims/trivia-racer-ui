import styled from "styled-components"
import { DESKTOP_MIN_WIDTH } from "../../constants"

export const StyledScores = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${DESKTOP_MIN_WIDTH} {
    flex-direction: row;
    justify-content: center;
  }
`

export const StyledScores__Content = styled.div`
  width: 240px;
  margin-bottom: 1em;
  margin-top: 3em;

  @media ${DESKTOP_MIN_WIDTH} {
    text-align: center;
    margin: 40px;
  }
`
