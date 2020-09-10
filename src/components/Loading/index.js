import React from "react"
import CircularProgress from "@material-ui/core/CircularProgress"

// Styled
import { StyledLoading, StyledLoadingText } from "./styled"

const Loading = () => {
  return (
    <StyledLoading key="loading" initial={{ scale: 0 }} animate={{ scale: 1 }}>
      <CircularProgress />
      <StyledLoadingText>Loading ...</StyledLoadingText>
    </StyledLoading>
  )
}

export default Loading
