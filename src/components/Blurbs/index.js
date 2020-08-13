import React from "react"
import { navigate } from "gatsby"

// Styled
import { StyledBlurbs } from "./styled"

// Components
import TriviaCard from "../TriviaCard"
import Brain from "../icons/Brain"
import History from "../icons/History"
import Science from "../icons/Science"

const Blurbs = () => {
  const onClick = category => {
    navigate(`/game?category=${category}`)
  }
  return (
    <StyledBlurbs>
      <TriviaCard
        onClick={() => onClick("general")}
        title="General"
        Icon={Brain}
        description='Who released the album "7800 Fahrenheit"?'
      />
      <TriviaCard
        onClick={() => onClick("history")}
        title="History"
        Icon={History}
        description="On what day was Julius Caesar Assasinated?"
      />
      <TriviaCard
        onClick={() => onClick("Science")}
        title="Science"
        Icon={Science}
        description="In what organ would you find the Cornea?"
      />
    </StyledBlurbs>
  )
}

export default Blurbs
