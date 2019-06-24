const { v4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "Role",
    {
      id: {
        primaryKey: true,
        type: DataTypes.STRING,
        defaultValue: () => v4()
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      hooks: {
        beforeCreate(user) {
          return cryptPassword(user.password).then(
            success => (user.password = success)
          );
        }
      }
    }
  );

  Role.associate = function({ User }) {
    Role.User = Role.hasMany(User);
  };

  return Role;
};
