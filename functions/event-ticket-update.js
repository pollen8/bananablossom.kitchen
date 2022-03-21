const query = require("./utilities/query");

const UPDATE_EVENT_TICKET = `
  mutation($id: ID!, $data: PartialUpdateTicketInput!) {
    partialUpdateTicket(id: $id, data:$data) {
      name
    }
  }
`;

exports.handler = async event => {
  const { data, id } = JSON.parse(event.body);
  const { data: res, errors } = await query(UPDATE_EVENT_TICKET, { id, data });

  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors)
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ name: res.name  })
  };
};
