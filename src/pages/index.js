import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import Layout from "../components/Layout"
import Image from "../components/Image"

// following styled component strucutre of https://stackoverflow.com/a/45391702/11303031

const IndexPage = () => (
  <Layout title="Home">
    <Header> Hi people </Header>
    <h2> i is header 2 who gets red color from GlobalStyle</h2>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link> <br />
    <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
  </Layout>
)

// @TODO change

const Header = styled.h1`
  color: blue;
`

export default IndexPage
