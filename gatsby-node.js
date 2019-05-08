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
    `
    {
        pages: allFile(filter: {
          sourceInstanceName: { eq: "pages" }
          internal: { mediaType: { eq: "text/markdown" }}
        }) {
          edges {
            node {
              childMarkdownRemark {
                fields {
                  slug
                }
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    const posts = result.data.pages.edges
    posts.forEach((post) => {
        createPage({
            path: post.node.childMarkdownRemark.fields.slug,
            component: pageComponent,
            context: {
                slug: post.node.childMarkdownRemark.fields.slug,
            },
        })
    })

    return null
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions
    const slug = createFilePath({ node, getNode })
    const collection = getNode(node.parent).sourceInstanceName

    if (node.internal.type === `MarkdownRemark`) {
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
