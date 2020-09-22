import styled from "styled-components"
import Button from "@material-ui/core/Button"

// $ sign is from tansient prop https://styled-components.com/docs/api#transient-props
export const StyledButtonSecondary = styled(Button)`
  color: white;
  background-color: ${props => props.theme.purple};
  height: 56px;
  border-radius: 0px 5px 5px 0;
`
