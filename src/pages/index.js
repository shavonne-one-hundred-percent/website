import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

class IndexPage extends React.Component {
  render(){
    const post = this.props.data.allMarkdownRemark.nodes[0]
    const siteTitle = this.props.data.site.siteMetadata.title
    const siteDescription = this.props.data.site.siteMetadata.description
  
    return (
      <Layout location="home" title={siteTitle}>
          <SEO 
            title="Home"
            description={siteDescription} 
          />
          <div dangerouslySetInnerHTML={{ __html: post.html }} />    
      </Layout>
    )
    
  }
}

export default IndexPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      filter: { fields: { slug: { eq: "/home/" }, collection: { eq: "blocks" } }}
    ) {
    	nodes {
        html
    	}
  	}
  }
`
