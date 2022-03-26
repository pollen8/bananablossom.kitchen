const query = require("./utilities/query");

const UPDATE_EVENT = `
  mutation($id: ID!, $data: PartialUpdateEventInput!) {
    partialUpdateEvent(id: $id, data:$data) {
      name
    }
  }
`;

exports.handler = async event => {
  const { data, id } = JSON.parse(event.body);
  const { data: res, errors } = await query(UPDATE_EVENT, { id, data });

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
