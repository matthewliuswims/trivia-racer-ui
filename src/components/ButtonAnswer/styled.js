import styled from "styled-components"

export const StyledButtonAnswer = styled.button`
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
  cursor: ${props => {
    if (props.disabled) return "not-allowed;"
    return "pointer;"
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

export const StyledButtonTooltip = styled.div`
  position: absolute;
  z-index: 2;
  right: -20px;
  top: -80px;
`

export const StyledButtonTooltip__Bubble = styled.div`
  position: relative;
  background: ${props => {
    if (props.animate === "correct") return props.theme.green
    if (props.animate === "incorrect") return props.theme.red
  }};
  border-radius: 0.4em;
  width: 5em;
  height: 3em;
  display: flex;
  justify-content: center;
  align-items: center;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 36px solid transparent;
    border-top-color: ${props => {
      if (props.animate === "correct") return props.theme.green
      if (props.animate === "incorrect") return props.theme.red
    }};

    border-bottom: 0;
    border-left: 0;
    margin-left: -18px;
    margin-bottom: -36px;
  }
`

export const StyledWrapper = styled.div`
  position: relative;
`

export const StyledButtonTooltip__Bubble__Text = styled.p`
  color: white;
`
