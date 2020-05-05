const k = process.env.FUNCTIONAL_TESTS_URL ? 'STRIPE_SECRET_KEY_TEST' : 'STRIPE_SECRET_KEY';
const stripe = require('stripe')(process.env[k]);
const faunadb = require('faunadb');

/* configure faunaDB Client with our secret */
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

exports.handler = async (event) => {

  // We only care to do anything if this is our POST request.
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 400,
      body: "This was not a POST request!"
    };
  }


  try {
    // Parse the body contents into an object.
    const data = JSON.parse(event.body);
    data.type = 'start';
    response = await client.query(q.Create(q.Ref("classes/payment_intents"), { data }));

    const metadata = {};
    data.order.forEach((item, i) => metadata[i] = item);
    const intent = await stripe.paymentIntents.create({
      amount: Math.round(data.amount),
      currency: 'gbp',
      receipt_email: data.email,
      metadata,
    });
    data.type = 'ok';
    response = await client.query(q.Create(q.Ref("classes/payment_intents"), { data: intent }));
    return {
      statusCode: 200,
      body: JSON.stringify({ statusCode: 200, client_secret: intent.client_secret, k })
    };

  } catch (e) {
    response = await client.query(q.Create(q.Ref("classes/payment_intents"), { data: e }));
    return {
      statusCode: 200,
      body: JSON.stringify({ statusCode: e.statusCode, message: e.raw.message, details: e.raw }),
    }
  }


}
