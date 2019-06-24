const assert = require("assert");
const { expect } = require("chai");
const User = require("../util/user");
const models = require("../models");

describe("User Test", function() {
  describe("Init user data", function() {
    before(() =>
      Promise.all([
        models.Institution.destroy({
          where: {
            domain: "invalid"
          }
        }),
        models.Institution.create({
          name: "test institute",
          url: "test.com",
          domain: "test"
        }),
        models.User.destroy({
          where: {
            name: "test name"
          }
        })
      ])
    );

    it("should catch invalid emails", function() {
      return User.create({
        name: "test",
        password: "password",
        email: "not-an-email.com",
        role: "student"
      }).catch(err => expect(err).to.be.equal("invalid email / domain"));
    });

    it("should catch invalid institutions", function() {
      return User.create({
        name: "test",
        password: "password",
        email: "test@invalid.com",
        role: "student"
      }).catch(err => expect(err).to.be.equal("invalid institution"));
    });

    it("should catch invalid roles", function() {
      return User.create({
        name: "test",
        password: "password",
        email: "test@test.com",
        role: "invalid role"
      }).catch(err => expect(err).to.be.equal("invalid role"));
    });
  });
});
