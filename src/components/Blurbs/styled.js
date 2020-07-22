import styled from "styled-components"
import { DESKTOP_MIN_WIDTH } from "../constants"

export const StyledBlurbs = styled.article`
  > section {
    margin-bottom: 3em;
  }

  @media ${DESKTOP_MIN_WIDTH} {
    display: flex;
    justify-content: space-between;
  }
`
