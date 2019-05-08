/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"
import facebookIcon from "../../content/assets/facebook.png"
require('typeface-gentium-book-basic')
require('typeface-vollkorn')


const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            tagline
            facebookURI
          }
        }
        allMarkdownRemark(
          filter: { fields: { slug: { eq: "/sidebar/" }, collection: { eq: "blocks" } }}
        ) {
          nodes {
            html
          }
        }
      }
    `}
    render={data => (
      <>
        <div
          style={{
            margin: `15px auto`,
            maxWidth: 960,
            border: "1px solid #666"
          }}
        >
          <Header siteTitle={data.site.siteMetadata.title} tagline={data.site.siteMetadata.tagline} />
          <div
            style={{
              backgroundColor: `white`,
              display: `flex`,
              flexDirection: `row`,
              flexWrap: `nowrap`,
            }}
          >
            <main
              style={{
                padding: `30px 50px`,
                minWidth: 653,
              }}
            >
              {children}
            </main>
            <aside
              style={{
                padding: `30px 15px`,
                minWidth: 307,
                borderLeft: `1px dotted #666`,
              }}
              dangerouslySetInnerHTML={{ __html: data.allMarkdownRemark.nodes[0].html }} 
            />
          </div>
          <footer
            style={{
              height: 61,
              backgroundColor: `#666`,
              paddingLeft: 50,
              verticalAlign: `middle`,
            }}
          >
            <a 
              href={data.site.siteMetadata.facebookURI}
              style={{ 
                display: `flex`,
                flexDirection: `row`,
                alignItems: `center`,
                height: `100%`,
                textDecoration: `none`,
                color: `white`,
              }}
            >
              <img src={facebookIcon} alt="Facebook Icon" style={{ marginBottom: 0, }}/>
              <span style={{ paddingLeft: 10}}>Follow me on Facebook!</span>
            </a>
          </footer>
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
