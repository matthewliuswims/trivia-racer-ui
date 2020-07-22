import styled from "styled-components"

export const StyledCard = styled.section`
  width: 240px;
  height: 160px;
  border: 1px solid ${props => props.theme.colorGrey1};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const StyledCard__Description = styled.p`
  padding: 1em;
`

export const StyledCard__Title = styled.p`
  color: white;
  margin-left: 0.4em;
`

export const StyledCard__Bottom = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 1em;
  background-color: ${props => props.theme.colorBlue};
`
