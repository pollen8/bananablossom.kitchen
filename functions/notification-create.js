const faunadb = require('faunadb');

/* configure faunaDB Client with our secret */
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

/* export our lambda function as named "handler" export */
exports.handler = async (event) => {
  /* parse the string body into a useable JS object */
  const item = {
    data: JSON.parse(event.body)
  }
  try {
    const response = await client.query(q.Create(q.Ref("classes/notifications"), item));
    return {
      statusCode: 200,
      body: JSON.stringify(response)
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error)
    }
  }

}
