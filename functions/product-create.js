const faunadb = require('faunadb');
const axios = require('axios');

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

    axios.post('https://api.netlify.com/build_hooks/5e4207320a25ca7d73f7b00e');
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
