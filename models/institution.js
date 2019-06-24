const { v4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const Institution = sequelize.define(
    "Institution",
    {
      id: {
        primaryKey: true,
        type: DataTypes.STRING,
        defaultValue: () => v4()
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false
      },
      domain: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );

  Institution.associate = function({ User, Book, InstitutionBook }) {
    Institution.Users = Institution.hasMany(User);
    Institution.Books = Institution.belongsToMany(Book, {
      through: InstitutionBook
    });
  };

  return Institution;
};
