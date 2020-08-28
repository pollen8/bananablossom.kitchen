const faunadb = require('faunadb');
const { rebuildSite } = require('./utilities/rebuild');

/* configure faunaDB Client with our secret */
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
});

exports.handler = async (event) => {
  const data = JSON.parse(event.body)
  console.log('Function `order-delete-batch` invoked', data.ids)
  try {
    const response = await Promise.all(
      data.ids.map((id) => client.query(q.Delete(q.Ref(q.Collection('orders'), id))))
    );
    await rebuildSite();
    return {
      statusCode: 200,
      body: JSON.stringify(response)
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error)
    }
  }
}
