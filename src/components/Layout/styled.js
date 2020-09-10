import styled from "styled-components"

export const StyledLayout = styled.main`
  padding: 2em;
  margin: 0 auto;
  max-width: 900px;
  min-height: calc(100vh - 150px);
`
// min-height above is from https://css-tricks.com/couple-takes-sticky-footer/, calc option to have sticky footer

export const StyledFooter = styled.footer`
  padding-top: 1em;
  padding-bottom: 1em;
  line-height: 1.6;
`

//
// export const StyledMain = styled.main`
//   min-height: calc(100vh - 100px);
// `
