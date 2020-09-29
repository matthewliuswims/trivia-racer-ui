import React, { useState, useEffect, useRef } from "react"
import { navigate } from "gatsby"
import { connect } from "react-redux"
import queryString from "query-string"
import "react-circular-progressbar/dist/styles.css"
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar"

// Components
import Error from "../components/Error"
import Layout from "../components/Layout"
import ScoreCurrent from "../components/scores/ScoreCurrent"
import GameAnswers from "../components/GameAnswers"
import GameQuestion from "../components/GameQuestion"
import Loading from "../components/Loading"
import ScoreHeader from "../components/scores/ScoreHeader"

// Selectors
import {
  selectQuestion,
  selectQuestions,
  selectAnswers,
  selectIndexQuestion,
  selectScore,
} from "../state/game"

// Helpers
import { request } from "../helpers/request"

// Constants
import * as c from "../state/game_constants"
import theme from "../components/Layout/theme"

const GamePage = ({
  location,

  questions,
  answers,
  indexQuestion,
  question,
  dispatch,
  score,
}) => {
  const timerRef = useRef()
  const countdownRef = useRef()
  const { search } = location

  const category = queryString.parse(search).category
  const [loadingQuestions, setLoadingQuestions] = useState(true)
  const [error, setError] = useState(null)

  const initialTime = 60
  const [time, setTime] = useState(initialTime)
  const noTime = time <= -2 // give a little buffer to help user XP
  const noQuestionsLeft = indexQuestion > 0 && indexQuestion >= questions.length
  const gameEnded = noTime || noQuestionsLeft

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await request({
          relativeUrl: `/v1/questions/?category=${category}&count=60`,
        })
        dispatch({ type: c.GAME_QUESTIONS_SET, questions: response })
      } catch (err) {
        console.error("error is", err)
        setError(err)
      } finally {
        setLoadingQuestions(false)
      }
    }
    fetchQuestions()
    return () => clearInterval(timerRef.current)
  }, [])

  useEffect(() => {
    if (gameEnded && !loadingQuestions) {
      clearInterval(timerRef.current)
      navigate(`/game-end`, {
        state: { fromGame: true },
      })
    }
  }, [time])

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
  }

  const [countdown, setCountdown] = useState(3)

  useEffect(() => {
    if (!loadingQuestions) {
      countdownRef.current = setInterval(() => {
        setCountdown(countdown => {
          if (countdown <= 0) {
            clearInterval(countdownRef.current)
            // start actual timer
            timerRef.current = setInterval(() => {
              setTime(time => time - 1)
            }, 1000)
          }
          return countdown - 1
        })
      }, 1000)
    }
    return () => clearInterval(countdownRef.current)
  }, [loadingQuestions])

  if (error) {
    return <Error />
  }

  if (loadingQuestions || !question) {
    return <Loading />
  }

  if (countdown > -1) {
    return (
      <Layout
        title="Game"
        HeaderRight={<ScoreHeader showToolTip>{score}</ScoreHeader>}
      >
        <div style={{ height: "5em", width: "5em", margin: "auto" }}>
          <CircularProgressbarWithChildren
            value={(countdown / 3) * 100}
            styles={buildStyles({ pathColor: theme.colorBlue })}
          >
            <ScoreCurrent display={countdown} />
          </CircularProgressbarWithChildren>
        </div>
        <div style={{ marginTop: "2em", textAlign: "center" }}>
          <h1>Get Ready!</h1>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="Game" HeaderRight={<ScoreHeader>{score}</ScoreHeader>}>
      <div style={{ height: "5em", width: "5em", margin: "auto" }}>
        <CircularProgressbarWithChildren
          value={time > 0 ? (time / initialTime) * 100 : 0}
          styles={buildStyles({ pathColor: theme.colorBlue })}
        >
          <ScoreCurrent display={time > 0 ? time : 0} />
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
  }
}

export default connect(mapStateToProps)(GamePage)
