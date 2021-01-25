import { expect } from 'chai';

import { parseBody } from '../functions/sendmail';

const body = {
  "subject": "Banana Blossom: Order failed",
  "error": "Your card was declined. Your request was in live mode, but used a known test card.",
  "delivery": "pickup", "order_time": { "hour": 13, "minute": 0 },
  "order_date": "Sun Feb 14 2021 00:00:00 GMT+0000 (Greenwich Mean Time)",
  "possibleDates": ["2021-01-31T00:00:00.163Z", "2021-02-07T00:00:00.163Z",
    "2021-02-14T00:00:00.163Z", "2021-02-21T00:00:00.163Z"], "pickupLocation":
  {
    "name": "Banana Blossom", "address": {
      "p-street-address":
        "35 Morley Road", "p-locality": "Basingstoke", "p-postal-code": " RG21 3LH"
    },
    "specialDate": true, "position": { "lat": 51.249996, "lng": -1.0960011 },
    "daytimes": [{
      "day": "Sunday", "time": {
        "start": { "hour": 17, "minute": 30 },
        "end": { "hour": 20, "minute": 0 }
      }
    }]
  },
  "additional_info": "test", "city": "", "email": "rob@pollen-8.co.uk",
  "name": "rob", "postcode": "", "street": "", "tel": "12341234", "total": "",
  "order": [{
    "product": {
      "description": "All your favourite are in this box! Let makes this Valentine a tastiest one! ",
      "id": "8784ecf5-47a5-5781-b738-73c4e9127d7a", "name": "Valentine platter for 2 ",
      "availableDate": "2021-02-14T00:00:00.000Z", "availableDays": [],
      "skus": [{
        "id": "57001162-d70c-491c-97d2-bc908d91cf4a", "glutenFree": false, "image": "",
        "name": "Meaty box include: 2 Pork spring rolls, 2 Mini yellow pancake filled with prawn, 2 Mini Pork and quail egg Bao Bun, 2 prawn summer rolls, 2 Prawns sweet potato cake. ", "price": "21", "vegan": false, "vegetarian": false, "unavailable": false, "nuts": false, "secure_url": ""
      }, {
        "id": "9e1473be-7283-42ac-a02b-efd7d299be37", "glutenFree":
          false, "image": "",
        "name": "Vegan box include: 2 vegetables spring rolls, 2 Mini yellow pancake filled with mushrooms, 2 Mini vegetables Bao Buns, 2 vegetables summer rice rolls, 2 crispy rice cake filled with mushrooms. ", "price": "18.50", "vegan": true, "vegetarian": false,
        "unavailable": false,
        "nuts": false, "secure_url": ""
      }]
    }, "quantity": 1, "sku": {
      "id": "57001162-d70c-491c-97d2-bc908d91cf4a", "glutenFree":
        false, "image": "",
      "name": "Meaty box include: 2 Pork spring rolls, 2 Mini yellow pancake filled with prawn, 2 Mini Pork and quail egg Bao Bun, 2 prawn summer rolls, 2 Prawns sweet potato cake. ", "price": "21", "vegan": false, "vegetarian": false, "unavailable": false, "nuts": false, "secure_url": ""
    }, "discounted": 0
  }]
};

describe('Array', function () {
  it('parses email content', () => {
    expect(parseBody(body)).to.equal('subject: Banana Blossom: Order failed<br/>error: Your card was declined. Your request was in live mode, but used a known test card.<br/>delivery: pickup<br/>Pickup/delivery time: 13: 0<br/>Pickup/delivery date: Sun Feb 14 2021<br/><br/>Pick up location: Banana Blossom<br /><br/>additional_info: test<br/>city: <br/>email: rob@pollen-8.co.uk<br/>name: rob<br/>postcode: <br/>street: <br/>tel: 12341234<br/>total: <br/><ul><li>1 Valentine platter for 2  Meaty box include: 2 Pork spring rolls, 2 Mini yellow pancake filled with prawn, 2 Mini Pork and quail egg Bao Bun, 2 prawn summer rolls, 2 Prawns sweet potato cake. </li></ul><br />');

  })
})
