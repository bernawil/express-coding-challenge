const assert = require("assert");
const { expect } = require("chai");
const User = require("../util/user");
const models = require("../models");

describe("Books Test", function() {
  describe("Test books and institution association", function() {
    it("should associate books to institutions", async function() {
      const isbn = "13241";
      await models.Book.destroy({
        where: {
          isbn
        }
      });
      await models.Institution.destroy({
        where: {
          name: "test institution"
        }
      });
      return Promise.all([
        models.Book.create({
          isbn,
          author: "test author",
          title: "test title"
        }),
        models.Institution.create({
          name: "test institution",
          url: "www.url.com",
          domain: "test"
        })
      ]).then(([{ id: BookId }, { id: InstitutionId }]) => {
        return models.InstitutionBook.create({
          InstitutionId,
          BookId
        }).then(() =>
          models.Book.findOne({
            where: {
              isbn
            },
            include: [
              {
                model: models.Institution
              }
            ]
          }).then(book => expect(book).to.be.not.null)
        );
      });
    });
  });
});
