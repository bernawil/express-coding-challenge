const User = require("../util/user");
module.exports = function(app) {
  app.use("/books", function(req, res, next) {
    if (!req.user) return res.send(403, { error: "sign in required" });
    return next();
  });
  app.get("/books", async (req, res) => {
    try {
      const books = await User.getInstitutionBooks(req.user);
      return res.send({
        status: "success",
        data: books.map(({ id, isbn, title, author }) => ({
          id,
          isbn,
          title,
          author
        }))
      });
    } catch (error) {
      return res.send({
        status: "error",
        data: {
          error: "invalid data"
        }
      });
    }
  });
};
