const faunadb = require('faunadb');

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

exports.handler = async (event) => {
  try {
    const response = await client.query(q.Paginate(q.Match(q.Ref("indexes/all_orders_by_date"))));
    const orderRefs = response.data;

    // create new query out of promotion refs. http://bit.ly/2LG3MLg
    const getAllOrderData = orderRefs.map((ref) => q.Get(ref[1]));
    const ret = await client.query(getAllOrderData);
    return {
      statusCode: 200,
      body: JSON.stringify(ret)
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error)
    }
  }
}
