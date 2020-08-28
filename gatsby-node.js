/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */


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
