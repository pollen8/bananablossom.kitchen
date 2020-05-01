const faunadb = require('faunadb');

/* configure faunaDB Client with our secret */
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

exports.handler = async (event) => {
  const { data, id } = JSON.parse(event.body)
  console.log("Function `product-update` invoked", data, id)

  try {
    response = await client.query(
      q.Update(
        q.Ref(q.Collection('products'), id),
        { data },
      )
    )
    console.log("success", response);

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
