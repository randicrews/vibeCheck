const Place = require("../models/Place");
const Report = require("../models/Report");
 

module.exports = {
  // bring user to location input
  namePlace: (req, res) => {
    res.render("report.ejs", {user: req.user.id});
  },
  // recieve user input
  submitReport: async (req, res) => {
    try {
      console.log(req.body);
      const { name, phys, long, lat, reportType, date, body } = req.body;
  
      // Check if the place already exists
      let existingPlace = await Place.findOne({ name, long });
      let locationID;
  
      if (!existingPlace) {
        // If the place doesn't exist, create a new one
        const newPlace = await Place.create({
          name,
          phys,
          long,
          lat,
          reportType: [reportType],
          reports: 1,
        });
        console.log("Place has been added!");
        locationID = newPlace._id;
      } else {
        // If the place already exists, update its reports and reportType
        await Place.findOneAndUpdate(
          { name, long },
          {
            $inc: { reports: 1 },
            $addToSet: { reportType: reportType },
          }
        );
        locationID = existingPlace._id;
      }

      // Create the report
      await Report.create({
        locationID,
        name,
        date,
        body,
        reportType,
        reportedBy: req.user.id,
      });
  
      res.redirect("/recieved");
    } catch (err) {
      console.log(err);
    }
  },
  // giveReport: (req, res) => {
  //   res.render("postReport.ejs");
  // },
};
