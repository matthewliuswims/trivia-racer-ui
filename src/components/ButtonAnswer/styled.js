import styled from "styled-components"
import { motion } from "framer-motion"

export const StyledButtonAnswer = styled(motion.button)`
  cursor: pointer;
  color: white;
  font-weight: bold;
  font-size: 1em;
  background-color: ${props => props.theme.purple};
  border-radius: 20px;
  width: 100%;
  height: 3em;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  box-shadow: 0.5px 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.25);

  &:hover {
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.25);
  }
`
