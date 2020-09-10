import React, { useState, useEffect } from "react"
import queryString from "query-string"

// Components
import Layout from "../components/Layout"
import ScoreCurrent from "../components/ScoreCurrent"
import GameAnswers from "../components/GameAnswers"
import GameQuestion from "../components/GameQuestion"
import Loading from "../components/Loading"

// Helpers
import { request } from "../helpers/request"

// @TODO: have versioning for sessionStorage of questions and maybe version?

const GamePage = ({ location }) => {
  const category = queryString.parse(location.search).category
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchData() {
      // questions exist, don't fetch new ones
      const questions = sessionStorage.getItem("questions")
      if (questions) {
        setQuestions(JSON.parse(questions))
        return
      }
      setLoading(true)
      try {
        const response = await request(`/v1/questions/?category=${category}`)
        if (!response.ok) throw Error(resp.statusText || resp.message)
        const responseParsed = await response.json()
        responseParsed.forEach(question => {
          question.correct_answer.animateState = "default"
          question.incorrect_answers.forEach(answer => {
            answer.animateState = "default"
          })
        })
        sessionStorage.setItem("questions", JSON.stringify(responseParsed))
        setQuestions(responseParsed)
      } catch (error) {
        console.error("error is", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Questions
  const [questionIndex, setQuestionIndex] = useState(
    JSON.parse(sessionStorage.getItem("questionIndex")) || 0
  )
  const [questions, setQuestions] = useState([])
  const question = questions[questionIndex]

  // Answers
  const [answers, setAnswers] = useState([])
  useEffect(() => {
    if (!question) return
    setAnswers([question.correct_answer, ...question.incorrect_answers])
  }, [questions])

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
    const correctId = question.correct_answer.id
    if (answer.id === correctId) {
      const newIndex = questionIndex + 1
      sessionStorage.setItem("questionIndex", JSON.stringify(newIndex))
      // update all answers
      setAnswers(answers => {
        return answers.map(answer => {
          if (answer.id === correctId) {
            return {
              ...answer,
              animateState: "correct",
            }
          }
          return answer
        })
      })
      setTimeout(() => {
        setQuestionIndex(newIndex)
        const question = questions[newIndex]
        if (!question)
          console.log("@TODO handle this edge case when all questions are done")
        setAnswers([question.correct_answer, ...question.incorrect_answers])
      }, 1500)
      console.log("correct answer")
    }
    // else was incorrect answer and do something
  }
  return (
    <Layout title="Game">
      <ScoreCurrent score={questionIndex} />
      <GameQuestion question={question.name} />
      <GameAnswers answers={answers} onClick={answerOnClick} />
    </Layout>
  )
}

export default GamePage
