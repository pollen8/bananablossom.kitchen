const faunadb = require('faunadb');

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

exports.handler = (event, context, callback) => {
  console.log("Function `promotion_codes-read-all` invoked")
  const payload = JSON.parse(event.body)

  return client.query(q.Paginate(q.Match(q.Ref("indexes/promotion_codes_search_code"), payload.code)))
    .then((response) => {
      const promotionRefs = response.data
      console.log("Promotion refs", promotionRefs)
      console.log(`${promotionRefs.length} promotions found`)
      // create new query out of todo refs. http://bit.ly/2LG3MLg
      const getAllPromotionDataQuery = promotionRefs.map((ref) => {
        return q.Get(ref)
      })
      // then query the refs
      return client.query(getAllPromotionDataQuery).then((ret) => {
        return callback(null, {
          statusCode: 200,
          body: JSON.stringify(ret.length === 0 ? {} : ret[0].data)
        })
      })
    }).catch((error) => {
      console.log("error", error)
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error)
      })
    })
}
