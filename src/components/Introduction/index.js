import React from "react"

import GraduationImage from "../images/GraduationImage"

// Styled
import {
  StyledSection,
  StyledSection__Blurb,
  StyledSection__Blurb__Heading,
  StyledSection__Blurb__Paragraph,
} from "./styled"

const Introduction = () => {
  return (
    <StyledSection>
      <StyledSection__Blurb>
        <StyledSection__Blurb__Heading>
          Answer Trivia Questions
        </StyledSection__Blurb__Heading>
        <StyledSection__Blurb__Paragraph>
          How many questions can you get right?
        </StyledSection__Blurb__Paragraph>
      </StyledSection__Blurb>
      <GraduationImage />
    </StyledSection>
  )
}

export default Introduction
