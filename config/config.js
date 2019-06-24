require("dotenv").config();
module.exports = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database:
    process.env.NODE_ENV === "test" ? process.env.DB_TEST : process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: "mysql"
};
