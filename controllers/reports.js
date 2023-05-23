const Report = require("../models/Report"); 
const Place = require("../models/Place"); 


module.exports = {
  beginReport: (req, res) => {
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
  
      res.redirect("/home");
    } catch (err) {
      console.log(err);
    }
  },
  deleteReport: async (req, res) => {
    try {
      // Find report by id
      let report = await Report.findById({ _id: req.params.id });
      // Delete report from db
      await Report.remove({ _id: req.params.id });
      await Place.findOneAndUpdate(
        { name: report.name, _id: report.locationID },
        {
          $inc: { reports: -1 },
        }
      );
      console.log("Deleted Report");
      res.redirect("/map");
    } catch (err) {
      res.redirect("/map");
    }
  },
  editReport: async (req, res) => {
    try {
      // find report by ID
      const { date, body } = req.body; // get date and body from req.body

      console.log(req.body)
      let report = await Report.findById(req.params.id);
  
      if (!report) {
        // if report is not found
        res.redirect("/map");
        return;
      } else {
        console.log('beeeeeep')
        await Report.findOneAndUpdate(
          { _id: report },
          {
            $set: { date, body },
          }
        );
      }
      // success 
      console.log('success')
      res.redirect("/map");
    } catch (err) {
      res.redirect("/map");
    }
  },
};
