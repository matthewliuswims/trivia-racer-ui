import styled from "styled-components"
import { motion } from "framer-motion"
import { DESKTOP_MIN_WIDTH } from "../constants"

export const StyledCard = styled(motion.section)`
  cursor: pointer;
  height: 160px;
  border-radius: 6px;
  border: 1px solid ${props => props.theme.colorGrey1};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 1px 1px 2px 3px rgba(0, 0, 0, 0.25);

  @media ${DESKTOP_MIN_WIDTH} {
    width: 240px;
  }

  &:hover {
    box-shadow: 3px 3px 5px 6px rgba(0, 0, 0, 0.25);
  }
`

export const StyledCard__Description = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 1.2em;
  padding-bottom: 2em;
`

export const StyledCard__Title = styled.p`
  color: white;
  margin-left: 0.4em;
`

export const StyledCard__Top = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 1em;
  background-color: ${props => props.theme.colorBlue};
`
