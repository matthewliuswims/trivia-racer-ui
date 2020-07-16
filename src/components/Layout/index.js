import React from "react"
import PropTypes from "prop-types"
import { ThemeProvider } from "styled-components"

import Header from "../Header"
import { StyledLayout } from "./styled"
import theme from "./theme"

// @TODO: cull this - need to see reference of other files eventually
import "./global.css"

const Layout = ({ children, title }) => {
  return (
    <ThemeProvider theme={theme}>
      <Header title={title} />
      <StyledLayout>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </StyledLayout>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
