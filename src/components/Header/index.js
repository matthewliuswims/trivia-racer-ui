import { Link, useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import SEO from "../SEO"

import { StyledHeader, StyledHeader__Content } from "./styled"

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
        <StyledHeader__Content>
          <h1>
            <Link
              to="/"
              style={{
                color: `white`,
                textDecoration: `none`,
              }}
            >
              {siteTitle}
            </Link>
          </h1>
        </StyledHeader__Content>
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
