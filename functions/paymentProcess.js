const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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
      payment_method_types: ['card'],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ client_secret: intent.client_secret, key: process.env.STRIPE_SECRET_KEY })
    };

  } catch (e) {
    return {
      statusCode: e.statusCode,
      body: JSON.stringify({ message: e.raw.message }),
    }
  }


}
