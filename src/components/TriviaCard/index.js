import React from "react"

// Styled
import {
  StyledCard,
  StyledCard__Description,
  StyledCard__Top,
  StyledCard__Title,
} from "./styled"

const TriviaCard = ({ title, Icon, description, onClick }) => {
  return (
    <StyledCard onClick={onClick}>
      <StyledCard__Top>
        {<Icon />}
        <StyledCard__Title>{title}</StyledCard__Title>
      </StyledCard__Top>
      <StyledCard__Description>
        <p>{description}</p>
      </StyledCard__Description>
    </StyledCard>
  )
}

export default TriviaCard
