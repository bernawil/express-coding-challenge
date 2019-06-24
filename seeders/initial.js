"use strict";

const { v4 } = require("uuid");
const { encryptPassword } = require("../util/encryptPassword");

module.exports = {
  up: async migration => {
    const now = new Date();
    const adminId = v4();
    await migration.bulkInsert(
      "Roles",
      [
        {
          id: adminId,
          title: "administrator",
          createdAt: now,
          updatedAt: now
        },
        {
          id: v4(),
          title: "student",
          createdAt: now,
          updatedAt: now
        },
        {
          id: v4(),
          title: "academic",
          createdAt: now,
          updatedAt: now
        }
      ],
      {}
    );
    const institutionId = [v4(), v4()];
    await migration.bulkInsert(
      "Institutions",
      [
        {
          id: institutionId[0],
          name: "Node School",
          url: "www.jsschool.com",
          domain: "jsschool",
          createdAt: now,
          updatedAt: now
        },
        {
          id: institutionId[1],
          name: "Express School",
          url: "www.express.com",
          domain: "expresschool",
          createdAt: now,
          updatedAt: now
        }
      ],
      {}
    );
    await migration.bulkInsert(
      "Users",
      [
        {
          id: v4(),
          name: "bernardo",
          password: await encryptPassword("password"),
          email: "bernawil@gmail.com",
          RoleId: adminId,
          InstitutionId: institutionId[0],
          createdAt: now,
          updatedAt: now
        }
      ],
      {}
    );
    const books = [v4(), v4(), v4()];
    await migration.bulkInsert(
      "Books",
      [
        {
          id: books[0],
          title: "Node.js Web Development",
          isbn: "1788626850",
          author: "David Herron",
          createdAt: now,
          updatedAt: now
        },
        {
          id: books[1],
          title: "PHP Web Development",
          isbn: "1781226851",
          author: "John Doe",
          createdAt: now,
          updatedAt: now
        },
        {
          id: books[2],
          title: "Mysql Database Administration",
          isbn: "1783626854",
          author: "Susan White",
          createdAt: now,
          updatedAt: now
        }
      ],
      {}
    );
    await migration.bulkInsert(
      "InstitutionBooks",
      [
        {
          id: v4(),
          BookId: books[0],
          InstitutionId: institutionId[0],
          createdAt: now,
          updatedAt: now
        },
        {
          id: v4(),
          BookId: books[1],
          InstitutionId: institutionId[0],
          createdAt: now,
          updatedAt: now
        },
        {
          id: v4(),
          BookId: books[1],
          InstitutionId: institutionId[1],
          createdAt: now,
          updatedAt: now
        },
        {
          id: v4(),
          BookId: books[2],
          InstitutionId: institutionId[1],
          createdAt: now,
          updatedAt: now
        }
      ],
      {}
    );
  },

  down: async migration => {
    await migration.bulkDelete("Users", null, {});
    await migration.bulkDelete("Roles", null, {});
    await migration.bulkDelete("Institutions", null, {});
    await migration.bulkDelete("Books", null, {});
    await migration.bulkDelete("InstitutionBooks", null, {});
  }
};
