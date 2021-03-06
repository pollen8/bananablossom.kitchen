const faunadb = require('faunadb');
const { rebuildSite } = require('./utilities/rebuild');

/* configure faunaDB Client with our secret */
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

/* export our lambda function as named "handler" export */
exports.handler = async (event) => {
  /* parse the string body into a useable JS object */
  const data = JSON.parse(event.body)
  const holidayItem = {
    data: data
  }
  try {
    const response = await client.query(q.Create(q.Ref("classes/holiday"), holidayItem));
    await rebuildSite();
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
