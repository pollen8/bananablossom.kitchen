const query = require("./utilities/query");

 const GET_EVENTS = `query {
  eventsByPublished(published:true) {
    data {
      _id
      date
      time
      places
      name
      description
      location
      url
      tickets {
        data{
          _id
          name
          description
          price
        }
      }
      published
      }
      }
  }
 `;

  exports.handler = async () => {
     const { data, errors } = await query(GET_EVENTS);

     if (errors) {
        return {
          statusCode: 500,
          body: JSON.stringify(errors)
        };
     }

     return {
       statusCode: 200,
       body: JSON.stringify({ data: data.eventsByPublished.data })
     };
   };
