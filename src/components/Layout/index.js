/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { createGlobalStyle } from "styled-components" // https://styled-components.com/docs/api

import Header from "../Header"
import "./layout.css"

const GlobalStyle = createGlobalStyle`
  h2 {
    color: red;
  }
`

const Layout = ({ children, title }) => {
  return (
    <>
      {/* gatsby recommends to put global style with other high level stuff - see https://www.gatsbyjs.org/docs/global-css/ */}
      <GlobalStyle />
      <Header title={title} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
