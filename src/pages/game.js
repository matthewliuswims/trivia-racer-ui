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
import ScoreCurrent from "../components/ScoreCurrent"
import GameAnswers from "../components/GameAnswers"
import GameQuestion from "../components/GameQuestion"
import Loading from "../components/Loading"

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
  const intervalRef = useRef()
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

  useEffect(() => {
    if (gameEnded && !loadingQuestions) {
      clearInterval(intervalRef.current)
      navigate(`/game-end`, {
        state: { fromGame: true },
      })
    }
  }, [time])

  if (error) {
    return <Error />
  }

  if (loadingQuestions || !question) {
    return <Loading />
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
  }
}

export default connect(mapStateToProps)(GamePage)
