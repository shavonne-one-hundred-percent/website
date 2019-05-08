/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const pageComponent = path.resolve(`./src/templates/page.js`)

  return graphql(
    `{
        pages: allMarkdownRemark(filter: {
          fields: { collection: { eq: "pages" }}
        }) {
          edges {
            node {
                fields {
                    slug
                }
            }
          }
        }
    }`
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    const posts = result.data.pages.edges
    posts.forEach((post) => {
        createPage({
            path: post.node.fields.slug,
            component: pageComponent,
            context: {
                slug: post.node.fields.slug,
            },
        })
    })

    return null
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions
    
    if (node.internal.type === `MarkdownRemark`) {
        const slug = createFilePath({ node, getNode })
        const collection = getNode(node.parent).sourceInstanceName
        
        createNodeField({
            name: `slug`,
            node,
            value: slug,
        })
        createNodeField({
            name: `collection`,
            node,
            value: collection,
        })
    }
}
