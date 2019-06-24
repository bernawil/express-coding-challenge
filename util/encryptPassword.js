const bcrypt = require("bcrypt-nodejs");
const encryptPassword = password => {
  return new Promise(function(resolve, reject) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) return reject(err);

      bcrypt.hash(password, salt, null, function(err, hash) {
        if (err) return reject(err);
        return resolve(hash);
      });
    });
  });
};

module.exports = {
  encryptPassword
};
