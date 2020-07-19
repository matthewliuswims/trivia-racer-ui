import styled from "styled-components"

export const StyledSVG = styled.svg`
  ${props => {
    if (props.positionLeft) {
      return `
        position: absolute;
        left: 2rem;
      `
    }
  }}
`
