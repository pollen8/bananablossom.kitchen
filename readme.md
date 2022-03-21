* Running

> npm start

The local site will be available at:

http://localhost:8888/

API endpoints can be called via urls such as 

http://localhost:8888/.netlify/functions/event-list

## Generating schema

* data-model.gql - defines the schema we will upload to fauna db's graphql UI
* `npm run faunasdk-gen` - queries the schema from Fauna db and creates the typescript client in /generated/sdk.ts

## TODO events

admin form add saleEndData date picker

hide events after saleEndData
payment - success increment number of tickets sold in placesSold column

nice to have - list event attendees in event details
admin - sales list - update to show its a ticket (hide delivery etc)
admin - email - update email template to show its a ticket sale (hide delivery etc)
customer - dont think they get a confirmation yet

## Done Events
admin: delete 
events details page
payment - put through cart
admin: create new
admin: update 
event homepage entry

## TODO

* Move all things into a graphQL schema

* Allow ordering of products (move frozen to end of list)
* look up product skus in backend and get prices from there - don't send total from front end
* set up staging site
* family meals
* Testimonials

* Special requests
  - intro 
  * Time picker allows you to select 2:15 which is grey'd out AND clicking 15h errors
* Cookie accept / policy
* terms and conditions / refunds

* Custom sign on - prompt to create an account after order.

Nice to have
* Pick unavailable dates from google ical https://www.gatsbyjs.org/packages/gatsby-source-ical/?=ical
* Geo locate user

Done:
* Mobile cart page
* Homepage design
* Mobile checkout pages
* Persist cart in session storage
* Web hook to update static menus (stripe test env)
* Add env vars into Netlify (dev versions)
* Show cart summary on checkout
* Stripe: Transfers test products to live
* Web hook to update static menus (stripe live env)
* Live API keys
* Prod env vars
* Add env vars into Netlify (live versions)
* special requests  -   * email to gmail account
* Delivery for orders over £25
- Delivery time 10 - 14h 16h - 18:30h
* Opening times
* Links to twitter etc
* About banana blossom page
* What to do with order summaries ? email & fauna db
* Netlify Auth to write out site admin tools.
* Menu - responsive
* Contact us info
* loading indicator after pressing payment button (done in meals-from-fauna branch)
* Gluten free / vegan / veg / nuts per product
* Order special dishes on certain days
* disable order delivery dates in past
