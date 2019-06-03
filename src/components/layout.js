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
