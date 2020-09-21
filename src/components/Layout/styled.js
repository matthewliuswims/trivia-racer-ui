import styled from "styled-components"
import { DESKTOP_MIN_WIDTH } from "../constants"

export const StyledLayout = styled.main`
  padding: 2em;
  margin: 0 auto;
  max-width: ${props => props.maxWidth};
  min-height: calc(100vh - 150px);
`
// min-height above is from https://css-tricks.com/couple-takes-sticky-footer/, calc option to have sticky footer
export const StyledFooter = styled.footer`
  margin-top: 4em;
  margin-bottom: 1em;
  line-height: 1.6;

  @media ${DESKTOP_MIN_WIDTH} {
    text-align: center;
    margin-top: 6em;
  }
`
