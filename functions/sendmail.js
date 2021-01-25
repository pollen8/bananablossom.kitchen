const sgMail = require('@sendgrid/mail')

const { SENDGRID_API_KEY } = process.env


const parseBody = (payload) => {
  const body = Object.keys(payload).map((k) => {
    if (k === 'order_date') {
      return `Pickup/delivery date: ` + new Date(payload[k]).toDateString();
    }
    if (k === 'order_time') {
      return `Pickup/delivery time: ${payload[k].hour}: ${payload[k].minute}`;
    }
    if (k === 'order' && typeof payload[k] === 'object') {
      return '<ul>' + payload[k].map((order) => `<li>${order.quantity} ${order.product.name} ${order.sku.name}</li>`) + '</ul>'
        + `<br />`;
    }
    if (k === 'possibleDates') {
      return '';
    }
    if (k === 'pickupLocation') {
      return 'Pick up location: ' + payload[k].name + '<br />';
    }
    return `${k}: ${payload[k]}`
  }).join("<br/>");
  return body;
}
exports.parseBody = parseBody;

exports.handler = async (event) => {

  const payload = JSON.parse(event.body)
  const { email, subject } = payload

  sgMail.setApiKey(SENDGRID_API_KEY);



  try {

    const body = parseBody(payload);
    const msg = {
      to: ['bananablossom.kitchen@gmail.com', 'fabrikar@gmail.com'],
      from: 'bananablossom.kitchen@gmail.com',
      subject: subject ? subject : 'banana-blossom.kitchen: Order',
      html: `email from: ${email}<br /><br /> ${body}`,
    };

    await sgMail.send(msg)

    return {
      statusCode: 200,
      body: "Message sent: " + body
    }
  } catch (e) {
    return {
      statusCode: e.code,
      body: e.message
    }
  }
};


