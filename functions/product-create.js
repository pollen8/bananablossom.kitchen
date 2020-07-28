const faunadb = require('faunadb');
const axios = require('axios');
const { rebuildSite } = require('./utilities/rebuild');

/* configure faunaDB Client with our secret */
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

exports.handler = async (event) => {
  const data = JSON.parse(event.body)
  console.log("Function `product-create` invoked", data)

  try {
    response = await client.query(q.Create(q.Ref("classes/products"), { data }));
    console.log("success", response);

    await rebuildSite();
    return {
      statusCode: 200,
      body: JSON.stringify(response)
    };
  } catch (error) {
    console.log("error", error)
    return {
      statusCode: 400,
      body: JSON.stringify(error)
    };
  }
}
