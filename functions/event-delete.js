const query = require("./utilities/query");

const DELETE_EVENT = `
mutation ($id: ID!) {
  deleteEvent(id: $id) {
    name
  }
}
`;

exports.handler = async event => {
  const { ids } = JSON.parse(event.body);
  const all = await Promise.all((ids.map((id) => query(DELETE_EVENT, { id }))));
  const errors = all.filter((r) => r.hasOwnProperty('errors')).map((r) => r.errors);
  if (errors.length > 0) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors)
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ ids })
  };
};
