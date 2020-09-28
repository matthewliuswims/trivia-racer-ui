import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"

// Components
import SEO from "../SEO"

// Styled
import {
  StyledHeader,
  StyledHeader__Link,
  StyledHeader__HeaderRightWrapper,
} from "./styled"

const Header = ({ title, HeaderRight }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  const siteTitle = data.site.siteMetadata.title
  return (
    <>
      <SEO title={title} />
      <StyledHeader>
        <h1 style={{ margin: "auto" }}>
          <StyledHeader__Link to="/">{siteTitle}</StyledHeader__Link>
        </h1>
        <StyledHeader__HeaderRightWrapper>
          {HeaderRight !== undefined ? HeaderRight : <div />}
        </StyledHeader__HeaderRightWrapper>
      </StyledHeader>
    </>
  )
}

Header.propTypes = {
  title: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
