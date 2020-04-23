const k = process.env.FUNCTIONAL_TESTS_URL ? 'STRIPE_SECRET_KEY_TEST' : 'STRIPE_SECRET_KEY';
const stripe = require('stripe')(process.env[k]);

exports.handler = async (event) => {

  // We only care to do anything if this is our POST request.
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 400,
      body: "This was not a POST request!"
    };
  }

  // Parse the body contents into an object.
  const data = JSON.parse(event.body);

  try {
    const intent = await stripe.paymentIntents.create({
      amount: data.amount,
      currency: 'gbp',
      payment_method: 'card',
      payment_method_types: ['card'],
      receipt_email: data.email,
      metadata: {
        order: data.order.join('; '),
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ client_secret: intent.client_secret, k })
    };

  } catch (e) {
    return {
      statusCode: e.statusCode,
      body: JSON.stringify({ message: e.raw.message, details: e.raw }),
    }
  }


}
