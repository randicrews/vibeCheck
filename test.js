const Place = require('../models/Place.js');

async function test() {
  const places = await Place.find({});
  console.log(places);
}

test();