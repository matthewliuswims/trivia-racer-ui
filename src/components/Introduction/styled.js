import styled from "styled-components"
import { DESKTOP_MIN_WIDTH } from "../constants"

export const StyledSection = styled.section`
  @media ${DESKTOP_MIN_WIDTH} {
    display: flex;
    align-items: center;
  }
`

export const StyledSection__Blurb = styled.div`
  @media ${DESKTOP_MIN_WIDTH} {
    margin-right: 5em;
  }
`

export const StyledSection__Blurb__Heading = styled.h3`
  font-weight: 700;
  font-size: 1.875em;
  line-height: 1.3;
`

export const StyledSection__Blurb__Paragraph = styled.p`
  font-weight: 400;
  font-size: 1em;
  line-height: 1.625;
  margin: 2em 0;
`
