import styled from "styled-components"
import { DESKTOP_MIN_WIDTH } from "../constants"

export const StyledSvg = styled.svg`
  height: 292px;
  width: 100%;

  @media ${DESKTOP_MIN_WIDTH} {
    height: 300px;
    width: 413px;
  }
`
