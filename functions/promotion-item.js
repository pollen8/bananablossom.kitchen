const faunadb = require('faunadb');

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

exports.handler = async (event) => {
  console.log("Function `promotion_codes-read-item` invoked")
  const payload = JSON.parse(event.body)

  try {
    const response = await client.query(q.Paginate(q.Match(q.Ref("indexes/promotion_codes_search_code"), payload.code)));
    const promotionRefs = response.data
    console.log("Promotion refs", promotionRefs)
    console.log(`${promotionRefs.length} promotions found`)
    // create new query out of promotion refs. http://bit.ly/2LG3MLg
    const getAllPromotionDataQuery = promotionRefs.map((ref) => q.Get(ref));
    const ret = await client.query(getAllPromotionDataQuery);
    return {
      statusCode: 200,
      body: JSON.stringify(ret.length === 0 ? {} : ret[0].data)
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error)
    }
  }
}
