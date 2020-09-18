import React, { useState } from "react"

// Components
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import ButtonSecondary from "../ButtonSecondary"

// Styled
import { StyledForm } from "./styled"

// @TODO Use material ui here.
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
      <FormControl variant="outlined">
        <InputLabel htmlFor="initials">Initials</InputLabel>
        <OutlinedInput
          id="initials"
          name="initials"
          value={value}
          onChange={handleChange}
          label="Initials"
          inputProps={{
            maxLength: 3,
            minLength: 1,
            placeholder: "up to three letters!",
            title: "Initials can only be letters or numbers",
            pattern: "[a-zA-Z0-9]+",
          }}
        />
      </FormControl>
      <ButtonSecondary type="submit" $marginTopSmall variant="contained">
        Save
      </ButtonSecondary>
    </StyledForm>
  )
}

export default Form
