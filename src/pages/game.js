import React, { useState } from "react"
import queryString from "query-string"

// Components
import Layout from "../components/Layout"
import ScoreCurrent from "../components/ScoreCurrent"
import GameQuestion from "../components/GameQuestion"

// @TODO: have an initial loading state.
const GamePage = ({ location }) => {
  const [score, setScore] = useState(0)
  const category = queryString.parse(location.search).category

  console.log("category is", category)
  return (
    <Layout title="Game">
      <ScoreCurrent score={score} />
      <GameQuestion question="I am a question" />
    </Layout>
  )
}

export default GamePage
