/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  // Avoid build errors if no notifications exist
  createTypes(`
    type allFaunaNotification implements Node {
        _id: ID
        message: String
        nodes: String
    }
  `)

  createTypes(`
    type faunaNotification implements Node {
        _id: ID
        message: String
    }
  `)
}


exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
  const result = await graphql(`
    query {
      allFaunaProduct {
        nodes {
          _id
          name
          skus {
            id
            name
            glutenFree
            image
            nuts
            price
            unavailable
            vegan
            vegetarian
          }
          availableDays
          course
          description
          id
          price
        }
      }
    }
  `)

  result.data.allFaunaProduct.nodes.forEach((node) => {
    node.skus.forEach((sku) => {
      createPage({
        path: node.name + '/' + sku.name,
        component: path.resolve(`./src/templates/product.tsx`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          product: node,
          sku: sku,
        },
      })
    })

  })
}
