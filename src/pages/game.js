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
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const initialTime = 60
  const [time, setTime] = useState(initialTime)
  const noTime = time <= -2 // give a little buffer to help user XP

  useEffect(() => {
    if (noTime) clearInterval(intervalRef.current)
  }, [time])

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
        setLoading(false)
      }
    }

    fetchQuestions()
    return () => clearInterval(intervalRef.current)
  }, [])

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error />
  }

  const gameEnded =
    noTime || (indexQuestion > 0 && indexQuestion >= questions.length)
  if (gameEnded) {
    return (
      <Layout title="Game End" maxWidth={"500px"}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <PartyingImage />
        </div>
        <h3 style={{ marginBottom: "0.5em", textAlign: "center" }}>
          Congragulations, your score on Trivia Racer is:
        </h3>
        <ScoreCurrent display={score} />
        <Form />
        <ButtonPrimary name="Try Again" marginTop />
        <ButtonPrimary name="Change Topic" marginTop />
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
  }
}

export default connect(mapStateToProps)(GamePage)
