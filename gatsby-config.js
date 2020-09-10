/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 *
 * https://www.gatsbyjs.org/docs/what-you-dont-need-plugins-for/
 * As a general rule, you may use any npm package you might use without Gatsby, with Gatsby.
 *
 * In the case of Styled Components, you could manually render the Provider component near the root of your application,
 * or you could just use gatsby-plugin-styled-components which takes care of this step for you in addition to any other
 * difficulties you may run into configuring Styled Components to work with server side rendering.
 *
 * source plugins bring data into Gatsby’s data (e.g. gatsby-source-filesystem)
 * transformer plugins transform the raw content brought by source plugins. (e.g. transformer-remark)
 */

require("dotenv").config({
  path: `.env.production`,
})

// @TODO: delete all the plugins i won't need
module.exports = {
  siteMetadata: {
    title: `Trivia Racer`,
    description: `Answer as many trivia questions as you can in one minute`,
    author: `matthew liu`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`, // @TODO: investigate if this and below are needed
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Trivia Racer`,
        short_name: `Trivia Racer`,
        start_url: `/`,
        background_color: `#006FBB`,
        theme_color: `#006FBB`,
        display: `minimal-ui`,
        icon: `src/images/favicon-32x32.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,

    // styled components https://www.gatsbyjs.org/docs/styled-components/
    `gatsby-plugin-styled-components`,
  ],
}
