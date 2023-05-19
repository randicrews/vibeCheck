const Place = require("../models/Place");

async function getVenues() {
  const places = await Place.find({});
  const venues = {};
  for (const place of places) {
    const venue = {
      center: { lat: place.lat, lng: place.long },
      complaints: place.reports,
    };
    venues[place.name] = venue;
  }
  return venues;
}

module.exports = { getVenues };