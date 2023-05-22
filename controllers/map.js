const Report = require("../models/Report.js");
const Place = require("../models/Place.js");

// const getVenues = require('../middleware/venues.js');

module.exports = {
  displayMap: async (req, res) => {
    try {
      console.log(req.user._id)
      var reports = await Report.find().sort({ createdAt: "desc" }).lean();
      var places = await Place.find().sort({ createdAt: "desc" }).lean();
      res.render("map.ejs", { reports: reports, places:places, user: req.user});
    } catch (err) {
      console.log(err);
    }
  },
  getData: async (req, res) => {
    try {
      var places = await Place.find().sort({ createdAt: "desc" }).lean();
      var filterPlaces = await Report.find().sort({ name: "desc" }).lean();
      var placeNames = filterPlaces.map(report => report.name);
      var placeIDs = filterPlaces.map(report => report.locationID);
      res.setHeader('Content-Type', 'application/json');
      res.json({ places:places, placesOnFile: placeNames, placeIDs: placeIDs });
    } catch (err) {
      console.log(err);
    }
  },
  getPlace: async (req, res) => {
    try {
      console.log(req.params, 'param', req.query, 'query')
      var locationID = req.query.locationId
      console.log(locationID)
      var reports = await Report.find({ locationID: locationID }).sort({  createdAt: "desc" }).lean();
      console.log(reports, 'reports')
      var places = await Place.find({ _id: locationID }).sort({createdAt: "desc" }).lean();
      console.log(places, 'places')
      res.render('map.ejs', { reports: reports, places:places });
    } catch (err) {
      console.log(err);
    }
  },
}