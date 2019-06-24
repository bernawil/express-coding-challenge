const User = require("../util/user");
module.exports = function(app) {
  app.post("/users/create", async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      const user = await User.create({ name, email, password, role });
      return res.send({
        status: "success",
        data: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });
    } catch (error) {
      console.log(error)
      return res.send({
        status: "error",
        data:
          typeof error === "string"
            ? { error }
            : { error: "invalid arguments for user" }
      });
    }
  });
};
