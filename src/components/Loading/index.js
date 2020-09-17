import React from "react"
import CircularProgress from "@material-ui/core/CircularProgress"

// Components
import Layout from "../Layout"

// Styled
import { StyledLoading, StyledLoadingText } from "./styled"

const Loading = () => {
  return (
    <Layout>
      <StyledLoading
        key="loading"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      >
        <CircularProgress />
        <StyledLoadingText>
          Loading... please wait a few moments
        </StyledLoadingText>
      </StyledLoading>
    </Layout>
  )
}

export default Loading
