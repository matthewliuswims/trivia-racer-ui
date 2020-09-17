import React from "react"
import { navigate } from "gatsby"

// Components
import Layout from "../Layout"
import ButtonPrimary from "../ButtonPrimary"

const Error = () => {
  return (
    <Layout>
      <h3> 😬 &nbsp;oops. There was an error, go back to the home page </h3>
      <ButtonPrimary name="Home Page" onClick={() => navigate(`/`)} marginTop />
    </Layout>
  )
}

export default Error
