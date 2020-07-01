const faunadb = require('faunadb');

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

exports.handler = async (event) => {
  try {
    const response = await client.query(q.Paginate(q.Match(q.Ref("indexes/all_holiday"))));
    const holidayRefs = response.data;
    // create new query out of availability refs. http://bit.ly/2LG3MLg
    const query = holidayRefs.map((ref) => q.Get(ref));
    const ret = await client.query(query);
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
