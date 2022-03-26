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

const parseTicketBody = (payload) => {
  return '<h1>Event confirmation</h1>' 
  + `<p>Additional info: ${payload?.additional_info ?? 'none'}<p>`
  + `<p>Email: ${payload?.email ?? ''}<p>`
  + `<p>Name: ${payload?.name ?? ''}<p>`
  + `<p>Tel: ${payload?.tel ?? ''}<p>`
  + `<h2>Order</h2>`
  + payload.order.map((order) => `<h3>${order.product.name}: ${order.sku.name}</h3>
  <p>${order.product.date} ${order.product.time}<br />[${order.quantity} tickets]</p>`)
}

exports.parseBody = parseBody;

exports.handler = async (event) => {
  const payload = JSON.parse(event.body);
  const { email, subject, onlyTickets } = payload;
  sgMail.setApiKey(SENDGRID_API_KEY);
console.log('send customer email to', email);
  try {
    const body = onlyTickets ? parseTicketBody(payload) : parseBody(payload);
    const msg = {
      to: [email],
      bcc: ['bananablossom.kitchen@gmail.com', 'fabrikar@gmail.com'],
      from: 'bananablossom.kitchen@gmail.com',
      subject: subject ? subject : 'banana-blossom.kitchen: Order confirmation',
      html: `${body}`,
    };

    await sgMail.send(msg)

    return {
      statusCode: 200,
      body: "Message sent: " + body
    }
  } catch (e) {
    console.log(e);
    return {
      statusCode: e.code,
      body: e.message
    }
  }
};


