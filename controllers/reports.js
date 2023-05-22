const Report = require("../models/Report"); 
const Place = require("../models/Place"); 


module.exports = {
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
};
