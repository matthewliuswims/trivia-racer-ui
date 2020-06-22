import React from "react"
import { Link } from "gatsby"
import styled from 'styled-components' // following https://www.reddit.com/r/reactjs/comments/aynfex/styled_components_share_your_folderfile_structure/

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"


const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Header> Hi people </Header>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link> <br />
    <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
  </Layout>
)

// Styles

const Header = styled.h1`
  color: blue;
`

export default IndexPage
