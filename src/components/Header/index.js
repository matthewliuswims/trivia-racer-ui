import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"

// Components
import SoundIcon from "../icons/SoundIcon"
import SEO from "../SEO"

// Styled
import { StyledHeader, StyledHeader__Link } from "./styled"

const Header = ({ title }) => {
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
        <SoundIcon />
        <h1>
          <StyledHeader__Link to="/">{siteTitle}</StyledHeader__Link>
        </h1>
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
