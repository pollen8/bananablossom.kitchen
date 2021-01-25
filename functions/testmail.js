const sgMail = require('@sendgrid/mail')

const { SENDGRID_API_KEY } = process.env

exports.handler = async (event) => {

  sgMail.setApiKey(SENDGRID_API_KEY);

  const msg = {
    to: ['fabrikar@gmail.com'],
    from: 'bananablossom.kitchen@gmail.com',
    subject: 'test',
    html: `test message`,
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
