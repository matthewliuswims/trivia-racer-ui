import React from "react"
import PropTypes from "prop-types"
import { ThemeProvider } from "styled-components"
import Wave from "react-wavify"

// styles
import Header from "../Header"
import { StyledLayout } from "./styled"
import theme from "./theme"

// @TODO: cull this - need to see reference of other files eventually
import "./global.css"

const Layout = ({ children, title }) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Header title={title} />
        <StyledLayout>{children}</StyledLayout>
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
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
