const sgMail = require('@sendgrid/mail')

const { SENDGRID_API_KEY } = process.env

exports.handler = async (event, context, callback) => {

  const payload = JSON.parse(event.body)
  const { email, subject } = payload

  sgMail.setApiKey(SENDGRID_API_KEY);

  const body = Object.keys(payload).map((k) => {
    if (k === 'order_date') {
      return `${k}: ` + new Date(payload[k]).toDateString();
    }
    if (k === 'order_time') {
      return `${k}: ${payload[k].hour}: ${payload[k].minute}`;
    }
    if (typeof payload[k] === 'object') {
      return `${k}: ${JSON.stringify(payload[k])}`;
    }
    return `${k}: ${payload[k]}`
  }).join("<br/>");

  const msg = {
    to: ['bananablossom.kitchen@gmail.com', 'fabrikar@gmail.com'],
    from: email,
    subject: subject ? subject : 'banana-blossom.kitchen: Order',
    html: body,
  };

  try {
    await sgMail.send(msg)

    return {
      statusCode: 200,
      body: "Message sent"
    }
  } catch (e) {
    return {
      statusCode: e.code,
      body: e.message
    }
  }
};