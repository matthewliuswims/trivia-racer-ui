import styled from "styled-components"
import { DESKTOP_MIN_WIDTH } from "../constants"

export const StyledSvg = styled.svg`
  height: 200px;
  margin: 1em 0 3em 0;

  @media ${DESKTOP_MIN_WIDTH} {
    margin-left: 3em;
    height: 300px;
    width: 413px;
    margin-bottom: 4em;
  }
`
