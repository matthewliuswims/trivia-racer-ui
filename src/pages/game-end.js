import React, { useState, useEffect } from "react"
import { navigate } from "gatsby"
import { connect } from "react-redux"

// Components
import PartyingImage from "../components/images/PartyingImage"
import Form from "../components/Form"
import Error from "../components/Error"
import Layout from "../components/Layout"
import ScoreCurrent from "../components/ScoreCurrent"
import ButtonPrimary from "../components/ButtonPrimary"
import Scores from "../components/Scores"

// Selectors
import { selectQuestionsAnswered, selectScore } from "../state/game"
import { selectScoresRecent, selectScoresTop } from "../state/scores"

// Helpers
import { request, setNewToken } from "../helpers/request"

// Constants
import * as c from "../state/game_constants"
import * as sc from "../state/scores_constants"

const GameEndPage = ({
  location,

  questionsAnswered,
  dispatch,
  score,

  scoresRecent,
  scoresTop,
}) => {
  const [loadingScores, setLoadingScores] = useState(false)
  const [error, setError] = useState(null)

  const [savedScore, setSavedScore] = useState(false)

  useEffect(() => {
    const { state } = location
    if (!state || !state.fromGame) {
      navigate("/")
    }
    return () => {
      dispatch({ type: c.GAME_RESET })
    }
  }, [])

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
        dispatch({ type: sc.SCORES_TOP_SET, scoresTop })
        dispatch({ type: sc.SCORES_RECENT_SET, scoresRecent })
      } catch (err) {
        console.error("err is", err)
        setError(err)
      } finally {
        setLoadingScores(false)
      }
    }
    fetchScores()
  }, [JSON.stringify(scoresRecent), JSON.stringify(scoresTop)])

  if (error) {
    return <Error />
  }

  const saveScore = value => {
    async function helper() {
      try {
        await request({
          relativeUrl: `/v1/gamesessions/`,
          options: {
            method: "POST",
            body: JSON.stringify({
              name: value,
              score,
              questions: questionsAnswered,
            }),
          },
        })
        await setNewToken()
      } catch (err) {
        console.error("save name err is", err)
        alert("Could not save that name. Please try a different name")
        return
      }

      try {
        setLoadingScores(true)
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
        dispatch({ type: sc.SCORES_TOP_SET, scoresTop })
        dispatch({ type: sc.SCORES_RECENT_SET, scoresRecent })
        setSavedScore(true)
      } catch (err) {
        console.error("save session err is", err)
        setError(err)
      } finally {
        setLoadingScores(false)
      }
    }

    helper()
  }

  return (
    <Layout title="Game End">
      <div style={{ maxWidth: "500px", margin: "auto" }}>
        {savedScore ? (
          <h3 style={{ marginBottom: "0.5em", textAlign: "center" }}>
            Score Saved Below
          </h3>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <PartyingImage />
            </div>
            <h3 style={{ marginBottom: "0.5em", textAlign: "center" }}>
              Congragulations, your score on Trivia Racer is:
            </h3>
            <ScoreCurrent display={score} />
            <Form saveScore={saveScore} />
          </>
        )}
        <ButtonPrimary name="Try Again" marginTop />
        <ButtonPrimary name="Change Topic" marginTop />
      </div>
      <div style={{ maxWidth: "900px" }}>
        <Scores
          scoresTop={scoresTop}
          scoresRecent={scoresRecent}
          loadingScores={loadingScores}
        />
      </div>
    </Layout>
  )
}

const mapStateToProps = state => {
  return {
    score: selectScore(state),
    scoresRecent: selectScoresRecent(state),
    scoresTop: selectScoresTop(state),
    questionsAnswered: selectQuestionsAnswered(state),
  }
}

export default connect(mapStateToProps)(GameEndPage)
