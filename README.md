# Where ATM SG?

Ever been an unfortunate situation where you had to find the nearest ATM to draw some cash? This webapp is here to filter out the noise that comes along with using google maps just to find ATMs.

## Learning points:

- Webscraping with jsdom
- Using RegEx to filter webscraped data
- GMaps API (geocoding, nearby places, place detail with ID)
- react-google-maps API and customizing its display

## To-do list

- Maybe filters should be part of search... but given that google API only gives top 20 out of 60 results, it might be wise to do separate search for each individual bank, but that would mean multiple API calls per user search, which is inefficient as well..
- focus on mobile ui first. atmlist only apply for desktop versions, with list on left side as a drawer
- while scrolling atmlist, beyond 20 items, re-search API for next 20 items.
- cull similar ATM overlaps (use PlaceDetail and address?)
- Removing API key from client side. react-dotenv?
- click on map to set searchlocation?
- Place Detail required? To get proper address and directions(?)
- Loading animations for buttons and lists
- Display error messages. Proper error handling of form submissions for nulls etc
- sanitization and validation of addressInput for search
- using user's location, navigator.geolocation

## Problem

- Initially, the plan was to use google maps API to search nearest ATMs. However, this turns out to be a pretty simplistic project which did not require the need for webscraping in the first place. With the webscraped data, getting information on the distance and commute time to each ATM would be costly because there are too many API calls involved (calling the maps API for every ATM, that is 2k ATMs just for a single check). In the end, using geocoding and googlemaps API's nearby place search was enough to get nearby ATMs.
- However, this was a good practice for webscraping and sanitizing raw data to get useful and presentable information.
- I will thus carry on with using google maps API for geocoding + nearby search
