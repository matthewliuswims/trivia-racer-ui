import React from "react"
import { Link } from "gatsby"

// Components
import Layout from "../components/Layout"
import GraduationImage from "../components/images/GraduationImage"

// following styled component strucutre of https://stackoverflow.com/a/45391702/11303031
// styled component naming convention - just go with approach 1 - https://dev.to/sandro_roth/how-to-structure-styled-components-with-react-and-ts-27pn
// instead of using classname prop - https://stackoverflow.com/questions/56047659/multiple-props-options-for-styled-components

const IndexPage = () => (
  <Layout title="Home">
    <h2> Answer Trivia Questions </h2>
    <p> How many questions can you answer in 30 seconds?</p>
    <GraduationImage />
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Link to="/page-2/">Go to page 2</Link> <br />
    <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
  </Layout>
)

export default IndexPage
