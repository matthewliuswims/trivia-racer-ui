import React from "react"

// Styled
import { StyledBlurbs } from "./styled"

// Components
import TriviaCard from "../TriviaCard"
import Brain from "../icons/Brain"
import History from "../icons/History"
import Science from "../icons/Science"

const Blurbs = () => {
  return (
    <StyledBlurbs>
      <TriviaCard
        title="General"
        Icon={Brain}
        description='Who released the album "7800 Fahrenheit"?'
      />
      <TriviaCard
        title="History"
        Icon={History}
        description="On what day was Julius Caesar Assasinated?"
      />
      <TriviaCard
        title="Science"
        Icon={Science}
        description="In what organ would you find the Cornea?"
      />
    </StyledBlurbs>
  )
}

export default Blurbs
