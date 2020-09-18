import styled from "styled-components"
import Button from "@material-ui/core/Button"

// $ sign is from tansient prop https://styled-components.com/docs/api#transient-props
export const StyledButtonSecondary = styled(Button)`
  color: white;
  background-color: ${props => props.theme.purple};
  margin-top: ${props => (props.$marginTopSmall ? "0.5em" : "0")};
`
