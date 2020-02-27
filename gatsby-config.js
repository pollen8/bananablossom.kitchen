require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Banana Blossom - eat like a Vietnamese`,
    description: `Home cooked Vietnamese food in Basingstoke.`,
    author: `@pollen8`,
  },
  plugins: [
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-plugin-stripe`,
      options: {
        async: true,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: 'myNodes',
        imagePath: 'imageUrl',
        // OPTIONAL: Name you want to give new image field on the node.
        // Defaults to 'localImage'.
        name: 'allItemImages',
      },
    },
    'gatsby-plugin-styled-components',
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/girl-leaf.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-stripe`,
      options: {
        objects: ['Sku', 'Product'],
        secretKey: process.env.STRIPE_SECRET_KEY,
        downloadFiles: true,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
