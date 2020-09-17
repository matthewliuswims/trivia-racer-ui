import React, { useState } from "react"

// Components
import ButtonSecondary from "../ButtonSecondary"

// Styled
import { StyledInput, StyledForm, StyledLabel } from "./styled"

const Form = () => {
  const [value, setValue] = useState("")

  const handleChange = event => {
    setValue(event.target.value)
  }

  const handleSubmit = event => {
    alert("value was submitted: " + value)
    event.preventDefault()
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledLabel htmlFor="initials">Initials:</StyledLabel>
      <StyledInput
        type="text"
        id="initials"
        name="initials"
        required
        onChange={handleChange}
        pattern="[a-zA-Z0-9]+"
        title="Initials can only be letters or numbers"
        placeholder="up to three letters!"
        minLength="1"
        maxLength="3"
        value={value}
      />
      <ButtonSecondary name="Save" />
    </StyledForm>
  )
}

export default Form
