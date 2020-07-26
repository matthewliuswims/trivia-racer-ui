import React from "react"
import PropTypes from "prop-types"
import { ThemeProvider } from "styled-components"

// styles
import Header from "../Header"
import { StyledLayout, StyledFooter } from "./styled"
import theme from "./theme"

// @TODO: cull this - need to see reference of other files eventually
import "./global.css"

const Layout = ({ children, title }) => {
  return (
    <ThemeProvider theme={theme}>
      <Header title={title} />
      <StyledLayout>
        <main>{children}</main>
        <StyledFooter>
          Built with ❤️ &nbsp; - comments and feedback welcome to my email:
          matthew [AT] matthewliu.net
        </StyledFooter>
      </StyledLayout>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
