module.exports = {
  getLanding: (req, res) => {
    res.render("landing.ejs");
  },
  getHome: async (req, res) => {
  try {
    res.render("home.ejs", { user: req.user });
  } catch (err) {
    console.log(err);
  }
  },
};
