import React from "react"
import PropTypes from "prop-types"
import { ThemeProvider } from "styled-components"
import { StylesProvider, createMuiTheme } from "@material-ui/core/styles"
import { ThemeProvider as ThemeProviderMUI } from "@material-ui/core/styles"
import Wave from "react-wavify"

// styles
import Header from "../Header"
import { StyledLayout } from "./styled"
import theme from "./theme"

import "./global.css"

const MATERIAL_THEME = createMuiTheme({
  typography: {
    fontFamily: [
      "Roboto",
      "-apple-system",
      '"Segoe UI"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
})

const Layout = ({
  children,
  title = "Trivia Racer",
  maxWidth = "900px",
  HeaderRight,
}) => {
  return (
    <StylesProvider injectFirst>
      <ThemeProviderMUI theme={MATERIAL_THEME}>
        <ThemeProvider theme={theme}>
          <Header title={title} HeaderRight={HeaderRight} />
          <StyledLayout maxWidth={maxWidth}>{children}</StyledLayout>
          <Wave
            fill="#006FBB"
            style={{
              height: "150px",
            }}
            paused={false}
            options={{
              height: 20,
              amplitude: 20,
              speed: 0.05,
              points: 3,
            }}
          />
        </ThemeProvider>
      </ThemeProviderMUI>
    </StylesProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
