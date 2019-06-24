const { v4 } = require("uuid");
const { encryptPassword } = require("../util/encryptPassword");
const bcrypt = require("bcrypt-nodejs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        primaryKey: true,
        type: DataTypes.STRING,
        defaultValue: () => v4()
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      RoleId: DataTypes.STRING,
      InstitutionId: DataTypes.STRING
    },
    {
      hooks: {
        beforeCreate(user) {
          return encryptPassword(user.password).then(
            success => (user.password = success)
          );
        }
      }
    }
  );

  User.associate = function({ Role, Institution }) {
    User.Role = User.belongsTo(Role);
    User.Institution = User.belongsTo(Institution);
  };

  User.checkPassword = async function(name, password) {
    const user = await User.findOne({ where: { name } });
    if (!user) return { user: null, validLogin: false };
    const validLogin = await user.checkPassword(password);
    return { user, validLogin };
  };

  User.prototype.checkPassword = function(password) {
    return new Promise((res, rej) =>
      bcrypt.compare(password, this.password, (err, resp) => {
        if (err) return rej(err);
        return res(resp);
      })
    );
  };

  return User;
};
