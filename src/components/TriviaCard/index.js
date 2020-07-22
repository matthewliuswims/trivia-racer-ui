import React from "react"

// Styled
import {
  StyledCard,
  StyledCard__Description,
  StyledCard__Bottom,
  StyledCard__Title,
} from "./styled"

const TriviaCard = ({ title, Icon, description, onClick }) => {
  return (
    <StyledCard onClick={onClick}>
      <StyledCard__Description>{description}</StyledCard__Description>
      <StyledCard__Bottom>
        {<Icon />}
        <StyledCard__Title>{title}</StyledCard__Title>
      </StyledCard__Bottom>
    </StyledCard>
  )
}

export default TriviaCard
