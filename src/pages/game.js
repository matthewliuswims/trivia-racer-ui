import React, { useState, useEffect, useRef } from "react"
import { connect } from "react-redux"
import queryString from "query-string"
import "react-circular-progressbar/dist/styles.css"
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar"

// Components
import PartyingImage from "../components/images/PartyingImage"
import Form from "../components/Form"
import Error from "../components/Error"
import Layout from "../components/Layout"
import ScoreCurrent from "../components/ScoreCurrent"
import GameAnswers from "../components/GameAnswers"
import ButtonPrimary from "../components/ButtonPrimary"
import GameQuestion from "../components/GameQuestion"
import Loading from "../components/Loading"
import Scores from "../components/Scores"

// Selectors
import {
  selectQuestion,
  selectQuestions,
  selectAnswers,
  selectIndexQuestion,
  selectScore,
  selectQuestionsAnswered,
} from "../state/game"

import { selectScoresRecent, selectScoresTop } from "../state/scores"

// Helpers
import { request, setNewToken } from "../helpers/request"

// Constants
import * as c from "../state/game_constants"
import * as sc from "../state/scores_constants"
import theme from "../components/Layout/theme"

const GamePage = ({
  location,

  questions,
  questionsAnswered,
  answers,
  indexQuestion,
  question,
  dispatch,
  score,

  scoresRecent,
  scoresTop,
}) => {
  const intervalRef = useRef()
  const { search } = location

  const category = queryString.parse(search).category
  const [loadingQuestions, setLoadingQuestions] = useState(true)
  const [loadingScores, setLoadingScores] = useState(false)
  const [error, setError] = useState(null)

  const [savedScore, setSavedScore] = useState(false)

  const initialTime = 60
  const [time, setTime] = useState(initialTime)
  const noTime = time <= -2 // give a little buffer to help user XP

  useEffect(() => {
    if (noTime) clearInterval(intervalRef.current)
  }, [time])

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

  useEffect(() => {
    async function fetchQuestions() {
      try {
        // const response = await request(`/v1/questions/?category=${category}`)
        const response = await request({
          relativeUrl: `/v1/questions/?category=${category}&count=2`,
        })
        dispatch({ type: c.GAME_QUESTIONS_SET, questions: response })
        intervalRef.current = setInterval(() => {
          setTime(time => time - 1)
        }, 1000)
      } catch (err) {
        console.error("error is", err)
        setError(err)
      } finally {
        setLoadingQuestions(false)
      }
    }

    fetchQuestions()
    return () => clearInterval(intervalRef.current)
  }, [])

  if (loadingQuestions) {
    return <Loading />
  }

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

  const gameEnded =
    noTime || (indexQuestion > 0 && indexQuestion >= questions.length)
  if (gameEnded) {
    return (
      <Layout title="Game End" maxWidth={"500px"}>
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
        <Scores
          scoresTop={scoresTop}
          scoresRecent={scoresRecent}
          loadingScores={loadingScores}
        />
      </Layout>
    )
  }

  const answerOnClick = answer => {
    dispatch({
      type: c.GAME_ANSWER_CHOICE,
      chosenID: answer.id,
      correctID: question.answer_correct_id,
      questionID: question.id,
    })
    setTimeout(() => {
      // wait a little bit to update the question and answers in the UI
      // if the user were to refresh the page before the timeout, session storage will take care of that
      dispatch({ type: c.GAME_QUESTION_NEW })
    }, 2500)
    // @TODO: else was incorrect answer and do something
  }

  return (
    <Layout title="Game">
      <div style={{ height: "5em", width: "5em", margin: "auto" }}>
        <CircularProgressbarWithChildren
          value={(time / initialTime) * 100}
          styles={buildStyles({ pathColor: theme.colorBlue })}
        >
          <ScoreCurrent display={score} />
        </CircularProgressbarWithChildren>
      </div>
      <GameQuestion question={question && question.name} />
      <GameAnswers answers={answers} onClick={answerOnClick} />
    </Layout>
  )
}

const mapStateToProps = state => {
  return {
    question: selectQuestion(state),
    questions: selectQuestions(state),
    answers: selectAnswers(state),
    indexQuestion: selectIndexQuestion(state),
    score: selectScore(state),
    scoresRecent: selectScoresRecent(state),
    scoresTop: selectScoresTop(state),
    questionsAnswered: selectQuestionsAnswered(state),
  }
}

export default connect(mapStateToProps)(GamePage)
