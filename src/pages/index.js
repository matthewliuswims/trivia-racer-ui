import React from "react"

// Components
import Layout from "../components/Layout"
import Introduction from "../components/Introduction"
import Blurbs from "../components/Blurbs"

// following styled component strucutre of https://stackoverflow.com/a/45391702/11303031
// styled component naming convention - just go with approach 1 - https://dev.to/sandro_roth/how-to-structure-styled-components-with-react-and-ts-27pn
// instead of using classname prop - https://stackoverflow.com/questions/56047659/multiple-props-options-for-styled-components

const IndexPage = () => (
  <Layout title="Home">
    <Introduction />
    <Blurbs />
  </Layout>
)

export default IndexPage
