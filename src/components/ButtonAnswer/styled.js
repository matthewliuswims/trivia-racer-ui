import styled from "styled-components"
import { motion } from "framer-motion"

export const StyledButtonAnswer = styled(motion.button)`
  cursor: pointer;
  color: white;
  font-weight: bold;
  font-size: 1em;
  background-color: ${props => {
    if (props.animate === "correct") return props.theme.green
    if (props.animate === "incorrect") return props.theme.red
    return props.theme.purple
  }};
  opacity: ${props => {
    if (props.animate === "unchosen") return "50%;"
    return "100%;"
  }}
  border-radius: 20px;
  width: 100%;
  height: 3em;
  margin-bottom: 1em;
  box-shadow: 0.5px 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.25);

  &:hover {
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.25);
  }
`
