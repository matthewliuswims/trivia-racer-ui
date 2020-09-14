import styled from "styled-components"
import { motion } from "framer-motion"

export const StyledButtonPrimary = styled(motion.button)`
  cursor: pointer;
  color: white;
  font-weight: bold;
  font-size: 1em;
  background-color: ${props => props.theme.colorBlue};
  border-radius: 20px;
  width: 100%;
  height: 3em;
  margin-top: ${props => (props.marginTop ? "2em" : "0")};
  box-shadow: 0.5px 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.25);

  &:hover {
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.25);
  }
`
