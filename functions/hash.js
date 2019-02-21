const bcrypt = require("bcryptjs");
module.exports = password => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        reject(Error(err));
      }

      bcrypt.hash(password, salt, function(err, hash) {
        if (err) {
          reject(Error(error));
        } else {
          resolve(hash);
        }
      });
    });
  });
};
