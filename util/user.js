const bcrypt = require("bcrypt-nodejs");
const models = require("../models");
const Op = require("sequelize").Op;

const getDomain = str => str.match(/\w*@(\w*)/)[1];

const create = ({ name, password, email, role }) =>
  models.User.findOne({
    where: {
      [Op.or]: [{ name }, { email }]
    }
  })
    .then(user => {
      if (user) throw "user exists";
      return getDomain(email);
    })
    .catch(err => {
      if (typeof err === "string") throw err;
      throw "invalid email / domain";
    })
    .then(domain => {
      return Promise.all([
        models.Institution.findOne({
          where: {
            domain
          }
        }),
        models.Role.findOne({
          where: {
            title: role
          }
        })
      ]);
    })
    .then(([institution, role]) => {
      if (!institution) throw "invalid institution";
      if (!role) throw "invalid role";
      return models.User.create({
        name: name,
        password: password,
        email: email,
        RoleId: role.id,
        InstitutionId: institution.id
      });
    });

const getInstitutionBooks = ({ id }) =>
  models.User.findOne({
    where: {
      id
    },
    include: [
      {
        model: models.Institution,
        include: [{ model: models.Book, required: false }],
        required: false
      }
    ]
  }).then(({ Institution: { Books } }) => Books);

module.exports = {
  create,
  getDomain,
  getInstitutionBooks
};
