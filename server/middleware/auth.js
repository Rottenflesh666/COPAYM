const jwt = require('jsonwebtoken');

module.exports.auth = function(req, res, next) {
  console.log("ok");
    if (req.headers.authorization !== "null") {
      let tokenBody = req.headers.authorization.split(' ');
      if (tokenBody.length === 2 && jwt.decode(tokenBody[1]) !== null)
        return next();
    }
  console.log("not today");
  res.json({
    status: 403
  });
};
