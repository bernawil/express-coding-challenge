const { v4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const InstitutionBook = sequelize.define(
    "InstitutionBook",
    {
      id: {
        primaryKey: true,
        type: DataTypes.STRING,
        defaultValue: () => v4()
      }
    },
    {}
  );

  InstitutionBook.associate = function({ Institution, Book }) {
    InstitutionBook.Institution = InstitutionBook.belongsTo(Institution);
    InstitutionBook.Book = InstitutionBook.belongsTo(Book);
  };

  return InstitutionBook;
};
