const faunadb = require('faunadb');
const query = require("./utilities/query");

const CREATE_EVENT = `
  mutation($event: EventInput! ) {
    createEvent(data: $event) {
      name
      published
    }
  }
`;

exports.handler = async event => {
  const foo = JSON.parse(event.body);

  const { data, errors } = await query(  CREATE_EVENT, { event: foo });

  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors)
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ testimonial: data.createMessage })
  };
};
