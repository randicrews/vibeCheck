const Place = require("../models/Place");
const Report = require("../models/Report");
 

module.exports = {
  // bring user to location input
  namePlace: (req, res) => {
    res.render("postLocation.ejs", {user: req.user.id});
  },
  // recieve user input
  submitPlace: async (req, res) => {
    try {
      console.log(req.body);
      // has this place already been reported?
      const existingPlace = await Place.find({
        name: req.body.name,
        long: req.body.long,
      });
      // if no, add to db
      if (existingPlace.length === 0) {
        const newPlace = await Place.create({
          name: req.body.name,
          phys: req.body.phys,
          long: req.body.long,
          lat: req.body.lat,
          reportType: [req.body.reportType],
          reports: 1,
        });
        console.log("Place has been added!");
        locationID = newPlace.id
      } 
      // if yes, increase report
      else {
        await Place.findOneAndUpdate(
          { name: req.body.name, long: req.body.long },
          {
            $inc: { reports: 1 },
            $addToSet: { reportType: ` ${req.body.reportType}` },

          }
        );
        locationID = existingPlace[0].id
      }
      res.render("postReport",{
        lat: req.body.lat,
        long: req.body.long,
        name: req.body.name,
        phys: req.body.phys,
        reportType: req.body.reportType,
        locationID: locationID,
      });
    } catch (err) {
      console.log(err);
    }
  },
  giveReport: async (req, res) => {
    try {
      console.log(req.body);
        await Report.create({ 
          locationID: req.body.locationID, 
          name: req.body.name,
          date: req.body.date,
          body: req.body.body,
          reportType: req.body.reportType,
          reportedBy: req.user.id
        })

        res.redirect("/home");
      } catch (err) {
        console.log(err);
      }
  },
  // giveReport: (req, res) => {
  //   res.render("postReport.ejs");
  // },
};
