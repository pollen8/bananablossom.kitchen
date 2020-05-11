const faunadb = require('faunadb');

/* configure faunaDB Client with our secret */
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

exports.handler = async (event) => {
  const { data, id } = JSON.parse(event.body)
  console.log("Function `order-update` invoked", data, 'id = ', id);
  try {
    // response = await client.query(q.Create(q.Ref("classes/orders"), order));
    // console.log("success", response)

    response = await client.query(
      q.Update(
        q.Ref(q.Collection('orders'), id),
        { data },
      )
    )

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
