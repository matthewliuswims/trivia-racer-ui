import React, { useState, useEffect, useReducer } from "react"
import { navigate } from "gatsby"
import queryString from "query-string"

// Components
import Layout from "../components/Layout"
import ScoreCurrent from "../components/ScoreCurrent"
import GameAnswers from "../components/GameAnswers"
import ButtonPrimary from "../components/ButtonPrimary"
import GameQuestion from "../components/GameQuestion"
import Loading from "../components/Loading"

// Helpers
import { request } from "../helpers/request"

// State
import { reducer, init } from "../state/game"
import * as c from "../state/game_constants"

// @TODO: have versioning for sessionStorage of questions and maybe version?

const GamePage = ({ location }) => {
  const { state: locationState, search } = location
  const fromHome = locationState && locationState.fromHome

  const [state, dispatch] = useReducer(reducer, {}, init)
  const category = queryString.parse(search).category
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { questions, answers, indexQuestion, question } = state
  // @TODO: fix bug with not being able to navigate to the game page directly
  useEffect(() => {
    async function fetchData() {
      // refreshing, and questions exist, don't fetch new ones
      if (!fromHome && questions.length > 0) return

      setLoading(true)
      try {
        // const response = await request(`/v1/questions/?category=${category}`)
        const response = await request(
          `/v1/questions/?category=${category}&count=2`
        )
        if (!response.ok) throw Error(resp.statusText || resp.message)
        const questionsResponse = await response.json()
        dispatch({ type: c.GAME_QUESTIONS_SET, questions: questionsResponse })
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (indexQuestion > 0 && indexQuestion >= questions.length) {
      navigate(`/game-end`)
    }
  }, [indexQuestion, questions])

  if (loading) {
    return (
      <Layout title="Game">
        <Loading />
      </Layout>
    )
  }

  if (error || !question || (!question.id && question.id !== 0)) {
    return (
      <Layout title="Game">
        <h3> 😬 &nbsp;oops. There was an error, go back to the home page </h3>
        <ButtonPrimary
          name="Home Page"
          onClick={() => navigate(`/`)}
          marginTop
        />
      </Layout>
    )
  }

  console.log("answers are", answers)

  const answerOnClick = answer => {
    const correctID = question.correct_answer.id
    if (answer.id === correctID) {
      dispatch({ type: c.GAME_ANSWER_CORRECT, correctID })
      setTimeout(() => {
        // wait a little bit to update the question and answers in the UI
        // if the user were to refresh the page before the timeout, session storage will take care of that
        dispatch({ type: c.GAME_QUESTION_NEW, correctID })
      }, 2500)
      console.log("correct answer was invoked")
    }
    // else was incorrect answer and do something
  }
  return (
    <Layout title="Game">
      <ScoreCurrent score={indexQuestion} />
      <GameQuestion question={question.name} />
      <GameAnswers answers={answers} onClick={answerOnClick} />
    </Layout>
  )
}

export default GamePage
