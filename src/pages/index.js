import React from "react"

// Components
import Layout from "../components/Layout"
import Introduction from "../components/Introduction"
import Blurbs from "../components/Blurbs"

// Styles
import { StyledFooter } from "../components/Layout/styled"

// following styled component strucutre of https://stackoverflow.com/a/45391702/11303031
// styled component naming convention - just go with approach 1 - https://dev.to/sandro_roth/how-to-structure-styled-components-with-react-and-ts-27pn
// instead of using classname prop - https://stackoverflow.com/questions/56047659/multiple-props-options-for-styled-components

const IndexPage = () => {
  return (
    <Layout title="Home" displayFooter={true}>
      <Introduction />
      <Blurbs />
      <StyledFooter>
        Built with ❤️ &nbsp; - comments and feedback welcome to my email:
        matthew [AT] matthewliu.net
      </StyledFooter>
    </Layout>
  )
}

export default IndexPage
