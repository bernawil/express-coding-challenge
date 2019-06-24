const bodyParser = require("body-parser");
const passport = require("passport");
const expressSession = require("express-session");
const Store = require("connect-session-sequelize")(expressSession.Store);
const LocalStrategy = require("passport-local").Strategy;
const logger = require("../util/logger");
const SESSION_KEY = "mysecret";
const db = require("../models");

module.exports = function(app) {
  passport.use(
    "local",
    new LocalStrategy(async function(username, password, done) {
      const { validLogin, user } = await db.User.checkPassword(
        username,
        password
      );
      return validLogin
        ? done(null, user)
        : done(null, false, {
            message: "Invalid username or password"
          });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async function(id, done) {
    const user = await db.User.findOne({ where: { id } });
    done(null, user);
  });

  app.use(
    expressSession({
      secret: SESSION_KEY,
      store: new Store({
        db: db.sequelize
      }),
      resave: false,
      saveUninitialized: false
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.post(
    "/users/signin",
    bodyParser.urlencoded({ extended: true }),
    passport.authenticate("local"),
    (req, res) => res.send(req.user.id)
  );

  app.post("/logout", async (req, res) => {
    req.logout();
    req.session.destroy(function(err) {
      err && logger.error(err);
      res.clearCookie("connect.sid");
      res.sendStatus(200);
    });
  });
};
