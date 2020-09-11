import React, { useState, useEffect, useReducer } from "react"
import queryString from "query-string"

// Components
import Layout from "../components/Layout"
import ScoreCurrent from "../components/ScoreCurrent"
import GameAnswers from "../components/GameAnswers"
import GameQuestion from "../components/GameQuestion"
import Loading from "../components/Loading"

// Helpers
import { request } from "../helpers/request"

// State
import { reducer } from "../state/game"
import * as c from "../state/game_constants"

// @TODO: have versioning for sessionStorage of questions and maybe version?

const GamePage = ({ location }) => {
  // @TODO move this function to the state file
  function init() {
    const questions = JSON.parse(sessionStorage.getItem("questions") || "[]")
    const indexQuestion =
      JSON.parse(sessionStorage.getItem("indexQuestion")) || 0
    const question = questions[indexQuestion] // will be undefined if out of index
    const answers = question
      ? [question.correct_answer, ...question.incorrect_answers]
      : []
    return {
      questions,
      question,
      answers,
      indexQuestion,
    }
  }

  const [state, dispatch] = useReducer(reducer, {}, init)
  const category = queryString.parse(location.search).category
  const [loading, setLoading] = useState(false)

  const { questions, answers, indexQuestion, question } = state

  useEffect(() => {
    async function fetchData() {
      // questions exist, don't fetch new ones
      console.log("fetching with questions", questions)
      if (questions.length > 0) return

      setLoading(true)
      try {
        const response = await request(`/v1/questions/?category=${category}`)
        if (!response.ok) throw Error(resp.statusText || resp.message)
        const questionsResponse = await response.json()
        dispatch({ type: c.GAME_QUESTIONS_SET, questions: questionsResponse })
      } catch (error) {
        console.error("error is", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <Layout title="Game">
        <Loading />
      </Layout>
    )
  }

  // @TODO or on if error
  if (!question || (!question.id && question.id !== 0)) {
    return (
      // @TODO: have a button below
      <Layout title="Game">
        <p> There was an error, go back to home page </p>
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
      }, 1500)
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
