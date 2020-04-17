const faunadb = require('faunadb');

/* configure faunaDB Client with our secret */
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

exports.handler = async (event) => {
  const data = JSON.parse(event.body)
  console.log("Function `order-create` invoked", data)
  const order = {
    data: data
  }
  try {
    response = await client.query(q.Create(q.Ref("classes/orders"), order));
    console.log("success", response)

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
