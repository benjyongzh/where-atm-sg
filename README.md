# Where ATM SG?

Ever been an unfortunate situation where you had to find the nearest ATM to draw some cash? This webapp is here to filter out the noise that comes along with using google maps just to find ATMs.

## Learning points:

- Webscraping with jsdom
- Using RegEx to filter webscraped data
- GMaps API (geocoding, nearby places, place detail with ID)
- react-google-maps API and customizing its display

## To-do list

- collapsable search section
- scrollable list container. while scrolling, beyond 20 items, re-search API for next 20 items.
- cull similar ATM overlaps (use PlaceDetail and address?)
- click on map to set searchlocation?
- Place Detail required? To get proper address and directions(?)
- Loading animations for buttons and lists
- Display error messages. Proper error handling of form submissions for nulls etc
- Removing API key from client side. react-dotenv?
- sanitization and validation of addressInput for search
- using user's location, navigator.geolocation

## Problem

- Initially, the plan was to use google maps API to search nearest ATMs. However, this turns out to be a pretty simplistic project which did not require the need for webscraping in the first place. With the webscraped data, getting information on the distance and commute time to each ATM would be costly because there are too many API calls involved (calling the maps API for every ATM, that is 2k ATMs just for a single check). In the end, using geocoding and googlemaps API's nearby place search was enough to get nearby ATMs.
- However, this was a good practice for webscraping and sanitizing raw data to get useful and presentable information.
- I will thus carry on with using google maps API for geocoding + nearby search
