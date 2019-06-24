const { v4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    "Book",
    {
      id: {
        primaryKey: true,
        type: DataTypes.STRING,
        defaultValue: () => v4()
      },
      isbn: {
        type: DataTypes.STRING,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );

  Book.associate = function({ Institution, InstitutionBook }) {
    Book.Institutions = Book.belongsToMany(Institution, {
      through: InstitutionBook
    });
  };

  return Book;
};
