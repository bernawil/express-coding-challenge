"use strict";

const models = require("../models");

module.exports = {
  up: async migration => {
    return models.sequelize.sync({ force: true });
  },

  down: async migration => {
    await migration.bulkDelete("Users", null, {});
    await migration.bulkDelete("Roles", null, {});
    await migration.bulkDelete("Institutions", null, {});
    await migration.bulkDelete("Books", null, {});
    await migration.bulkDelete("InstitutionBooks", null, {});
  }
};
