import React, { useEffect, useState } from "react"
import { connect } from "react-redux"

// Components
import Layout from "../components/Layout"
import Introduction from "../components/Introduction"
import Blurbs from "../components/Blurbs"
import Scores from "../components/scores/Scores"

// Styles
import { StyledFooter } from "../components/Layout/styled"

// Selectors
import { selectScoresRecent, selectScoresTop } from "../state/scores"

// Helpers
import { request } from "../helpers/request"

// Constants
import * as c from "../state/scores_constants"

// following styled component strucutre of https://stackoverflow.com/a/45391702/11303031
// styled component naming convention - just go with approach 1 - https://dev.to/sandro_roth/how-to-structure-styled-components-with-react-and-ts-27pn
// instead of using classname prop - https://stackoverflow.com/questions/56047659/multiple-props-options-for-styled-components

const IndexPage = ({ dispatch, scoresRecent, scoresTop }) => {
  const [loadingScores, setLoadingScores] = useState(true)
  useEffect(() => {
    async function fetchScores() {
      try {
        const responses = await Promise.all([
          request({
            relativeUrl: `/v1/gamesessions/?top=true`,
            needToken: false,
          }),
          request({
            relativeUrl: `/v1/gamesessions/`,
            needToken: false,
          }),
        ])
        const [scoresTop, scoresRecent] = responses
        dispatch({ type: c.SCORES_TOP_SET, scoresTop })
        dispatch({ type: c.SCORES_RECENT_SET, scoresRecent })
      } catch (err) {
        console.error("error is", err)
      } finally {
        setLoadingScores(false)
      }
    }
    fetchScores()
  }, [])

  return (
    <Layout displayFooter={true}>
      <Introduction />
      <Blurbs />
      <Scores
        scoresTop={scoresTop}
        scoresRecent={scoresRecent}
        loadingScores={loadingScores}
      />
      <StyledFooter>
        Built with ❤️ &nbsp;- comments and feedback welcome to my email: matthew
        [AT] matthewliu.net
      </StyledFooter>
    </Layout>
  )
}

const mapStateToProps = state => {
  return {
    scoresRecent: selectScoresRecent(state),
    scoresTop: selectScoresTop(state),
  }
}

export default connect(mapStateToProps)(IndexPage)
