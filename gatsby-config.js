require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Banana Blossom - eat like a Vietnamese`,
    description: `Home cooked Vietnamese food in Basingstoke.`,
    author: `@pollen8`,
    siteUrl: `https://banana-blossom.kitchen`,
  },
  plugins: [
    `gatsby-plugin-sitemap`,
    // You can should only have one instance of this plugin
    {
      resolve: `gatsby-plugin-netlify-identity`,
      options: {
        url: `https://www.banana-blossom.kitchen/` // required!
      },
    },
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
    {
      resolve: `gatsby-source-faunadb`,
      options: {
        secret: process.env.FAUNADB_SECRET,
        index: `all_products`,
        type: "faunaProduct",
      },
    },
    {
      resolve: `gatsby-source-faunadb`,
      options: {
        secret: process.env.FAUNADB_SECRET,
        index: `all_holiday`,
        type: "faunaHoliday",
      },
    },
    {
      resolve: `gatsby-source-faunadb`,
      options: {
        secret: process.env.FAUNADB_SECRET,
        index: `all_notifications`,
        type: "faunaNotification",
      },
    },
    {
      resolve: `gatsby-source-cloudinary`,
      options: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
        resourceType: `image`,
        maxResults: 100,
      }
    },
    {
      resolve: "@sentry/gatsby",
      options: {
        dsn: 'https://99ffdba594914799a9392850781968b4@o445340.ingest.sentry.io/5421623',
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
